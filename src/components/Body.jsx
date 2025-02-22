import React from 'react'
import { Grid } from '@material-ui/core'
import Controls from './Controls'
import Element from './Element'
import '../styles.css'
import '../helper/mergeSort'
import getMergeAnimations from '../helper/mergeSort'

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function setColor(domBars, color) {
    for (const bar of domBars) {
        bar.style.backgroundColor = color; 
    }
}

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: [],
            isRunning: false,
            maxBars: 50,
            speed: 60,
        }
        this.resetArray = this.resetArray.bind(this);
        this.resetProps = this.resetPropPositions.bind(this);
        this.haltSort = this.haltSort.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleSize = this.handleSize.bind(this);
        this.handleSpeed = this.handleSpeed.bind(this);
        this.bubbleSort = this.bubbleSort.bind(this);
        this.quickSort = this.quickSort.bind(this);
        this.mergeSort = this.mergeSort.bind(this);
        this.heapSort = this.heapSort.bind(this);
        this.heapify = this.heapify.bind(this);
    }

    componentDidMount() {
        this.resetArray();
    }

    componentDidUpdate() {}

    haltSort() {
        this.setState({isRunning: false});
        this.resetPropPositions();
    }

    handleSize(num) {
        if (num === this.state.maxBars) return;

        this.setState({maxBars: num,});
        this.resetArray();
    }

    handleSpeed(num) {
        if (num === this.state.speed) return;
        this.setState({speed: 60 / num});
    }

    async handleSort(algorithm) {
        await this.setState({isRunning: true});
        const array = [...this.state.elements];
        switch (algorithm) {
            case 'bubble':
                this.bubbleSort(array);
                break;
            case 'quick':
                this.quickSort(array);
                break;
            case 'merge':
                this.mergeSort(array);
                break;
            case 'heap':
                this.heapSort(array);
                break;
            default:
                console.log('unexpected parameter for handleSort');
                this.setState({isRunning: false,});
        }
    }

    async heapify(array, index, size, domBars) {
        if (!this.state.isRunning) return;
        let left = 2 * index;
        let right = left + 1;
        let max;

        if (right < size) {
            setColor([domBars[left], domBars[right]], 'green');
            await sleep(this.state.speed);
            if (array[left].props.height >= array[right].props.height) {
                max = left;
            } else {
                max = right;
            }
            setColor([domBars[left], domBars[right]], 'gray');
        } 
        else if (left < size) {
            max = left;
        } 
        else return;

        setColor([domBars[index], domBars[max]], 'green');
        await sleep(this.state.speed);
        if (array[index].props.height < array[max].props.height) {
            setColor([domBars[index], domBars[max]], 'red');
            [array[index], array[max]] = [array[max], array[index]];
            this.setState({elements: array});
            await sleep(this.state.speed);
            setColor([domBars[index], domBars[max]], 'gray');

            await this.heapify(array, max, size, domBars); 
        }
        setColor([domBars[index], domBars[max]], 'gray');
    }

    async heapSort(array) {
        const size = array.length;
        const domBars = document.getElementsByClassName('bar');

        for(let i = Math.floor(size / 2) - 1; i >= 0; --i) {
            if (!this.state.isRunning) {
                this.resetPropPositions();
                return;
            }
            await this.heapify(array, i, size, domBars);
        }

        for(let i = size - 1; i >= 0; --i) {
            if (!this.state.isRunning) {
                setColor([...domBars], 'gray');
                this.resetPropPositions();
                return;
            }
            setColor([domBars[i], domBars[0]], 'red');
            [array[0], array[i]] = [array[i], array[0]];
            
            this.setState({elements: array});
            await sleep(this.state.speed);
            setColor([domBars[0]], 'gray');
            setColor([domBars[i]], 'purple');

            await this.heapify(array, 0, i, domBars);
        }

        this.setState({elements: array});
        this.setState({isRunning: false,});
    }

    async quickSort(array) {
        const domBars = document.getElementsByClassName('bar');

        // choosing last element in array as pivot
        const partition = async (array, start, end) => {
            const pivotValue = array[end];
            let pivotIndex = start;
            setColor([domBars[end]], 'yellow');

            for(let i = start; i < end; ++i) {
                if (!this.state.isRunning) { 
                    setColor([domBars[end]], 'gray');
                    this.resetPropPositions();
                    return pivotIndex;
                }

                setColor([domBars[i]], 'green');
                await sleep(this.state.speed);

                if (array[i].props.height <= pivotValue.props.height) {
                    setColor([domBars[i], domBars[pivotIndex]], 'red');

                    [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
                    this.setState({elements: array});
                    await sleep(this.state.speed);

                    setColor([domBars[i], domBars[pivotIndex]], 'gray');
                    ++pivotIndex;
                }
                setColor([domBars[i]], 'gray');
            }

            setColor([domBars[end], domBars[pivotIndex]], 'red');
            [array[end], array[pivotIndex]] = [array[pivotIndex], array[end]];
            this.setState({elements: array});
            await sleep(this.state.speed);
            setColor([domBars[end], domBars[pivotIndex]], 'gray');

            return pivotIndex;
        }

        const stack = [[0, array.length - 1]];

        while(stack.length !== 0) {
            if (!this.state.isRunning) {
                this.resetPropPositions();
                return;
            }

            const [start, end] = stack.pop();
            const pivotIndex = await partition(array, start, end);

            if (pivotIndex - 1 > start) {
                stack.push([start, pivotIndex - 1]);
            }

            if (pivotIndex + 1 < end) {
                stack.push([pivotIndex + 1, end]);
            }
        }

        this.setState({isRunning: false,});
    }
    
    async mergeSort(array) {
        const animations = getMergeAnimations(array);
        const domBars = document.getElementsByClassName('bar');

        for (let i = 0; i < animations.length; ++i) {
            if (!this.state.isRunning) return;

            if (i % 2 === 0) {
                const [index1, index2] = animations[i];

                setColor([domBars[index1], domBars[index2]], 'green');
                await sleep(this.state.speed);
                setColor([domBars[index1], domBars[index2]], 'gray');
            } else {
                const [index1, element] = animations[i];
                const index2 = parseInt(element.props.pos)
                array[index1] = <Element key={new Date().getTime()} pos={index1} height={element.props.height} />;
                
                this.setState({elements: array});
                setColor([domBars[index1], domBars[index2]], 'red');
                await sleep(this.state.speed);
                setColor([domBars[index1], domBars[index2]], 'gray');
            }
        }
        this.setState({isRunning: false});
        this.resetPropPositions();
    }
    
    async bubbleSort(array) {
        const domBars = document.getElementsByClassName('bar');

        for(let i = 0; i < array.length; ++i) {
            for(let j = 0; j < array.length - 1 - i; ++j) {
                if (!this.state.isRunning) {
                    setColor([...domBars], 'gray');
                    this.resetPropPositions();
                    return;
                }
                // highlight comparing elements in green
                setColor([domBars[j], domBars[j + 1]], 'green');
                await sleep(this.state.speed);

                if (array[j].props.height > array[j + 1].props.height) {
                    // highlight swapping elements red
                    setColor([domBars[j], domBars[j + 1]], 'red');
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    this.setState({elements: array,});
                    await sleep(this.state.speed);
                } 
                // post-swap reset to normal
                setColor([domBars[j], domBars[j + 1]], 'gray');
            }
            // sorted elements in purple
            setColor([domBars[array.length - 1 - i]], 'purple'); 
        }

        this.setState({isRunning: false});
    };

    render() {
        return (
            <Grid container className="root" component="main">
                <Grid item xs={12} md={11} className="visualization" component="section">
                    { this.state.elements }
                </Grid>
                <Controls setSorter={this.handleSort} setSize={this.handleSize} setSpeed={this.handleSpeed}
                            resetArray={this.resetArray} isRunning={this.state.isRunning} haltSort={this.haltSort} />
            </Grid>
        )
    };

    resetArray() {
        const getRandomInt = (low, high) => {
            return Math.floor(Math.random() * (high - low + 1) + low);
        }

        const array = new Array(this.state.maxBars);
        for(let i = 0; i < array.length; ++i) {
            const height = getRandomInt(25, 500);
            array[i] = <Element height={height} key={i} pos={i} />;
        }

        const domBars = document.getElementsByClassName('bar');
        for(const bar of domBars) {
            bar.style.backgroundColor = 'gray';
        }

        this.setState({elements: array});
    }

    resetPropPositions() {
        const array = [...this.state.elements];

        for(let i = 0; i < array.length; ++i) {
            array[i] = <Element pos={i} height={array[i].props.height} key={array[i].key} />;
        }

        this.setState({elements: array});
    }
}

export default Body
