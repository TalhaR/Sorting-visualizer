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
            maxBars: 10,
        }
        this.resetArray = this.resetArray.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleSize = this.handleSize.bind(this);
        this.bubbleSort = this.bubbleSort.bind(this);
        this.quickSort = this.quickSort.bind(this);
        this.mergeSort = this.mergeSort.bind(this);
    }

    componentDidMount() {
        this.resetArray();
    }

    componentDidUpdate() {}

    handleSize(num) {
        if (num === this.state.maxBars) return;

        this.setState({maxBars: num,});
        this.resetArray();
    }

    handleSort(algorithm) {
        this.setState({isRunning: true});
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
                break;
            default:
                console.log('unexpected parameter for handleSort');
                this.setState({isRunning: false,});
        }
    }

    async quickSort(array) {
        const domBars = document.getElementsByClassName('bar');

        const partition = async (array, start, end) => {
            const pivotValue = array[end];
            let pivotIndex = start;
            setColor([domBars[end]], 'yellow');

            for(let i = start; i < end; ++i) {
                setColor([domBars[i]], 'green');
                await sleep(20);

                if (array[i].props.height <= pivotValue.props.height) {
                    setColor([domBars[i], domBars[pivotIndex]], 'red');

                    [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
                    this.setState({elements: array});
                    await sleep(20);

                    setColor([domBars[i], domBars[pivotIndex]], 'gray');
                    ++pivotIndex;
                }
                setColor([domBars[i]], 'gray');
            }

            setColor([domBars[end], domBars[pivotIndex]], 'red');
            [array[end], array[pivotIndex]] = [array[pivotIndex], array[end]];
            this.setState({elements: array});
            await sleep(20);
            setColor([domBars[end], domBars[pivotIndex]], 'gray');

            return pivotIndex;
        }

        const stack = [[0, array.length - 1]];

        while(stack.length !== 0) {
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
            if (i % 2 === 0) {
                const [index1, index2] = animations[i];

                setColor([domBars[index1], domBars[index2]], 'green');
                await sleep(25);
                setColor([domBars[index1], domBars[index2]], 'gray');
            } else {
                const [index1, element] = animations[i];
                array[index1] = <Element key={'overwrite' + i} height={element.props.height} />;
                
                this.setState({elements: array});
                setColor([domBars[index1], domBars[element.key]], 'red');
                await sleep(25);
                setColor([domBars[index1], domBars[element.key]], 'gray');
            }
        }
        this.setState({isRunning: false});
    }
    
    async bubbleSort(array) {
        const domBars = document.getElementsByClassName('bar');

        for(let i = 0; i < array.length; ++i) {
            for(let j = 0; j < array.length - 1 - i; ++j) {
                // highlight comparing elements in green
                setColor([domBars[j], domBars[j + 1]], 'green');
                await sleep(10);

                if (array[j].props.height > array[j + 1].props.height) {
                    // highlight swapping elements red
                    setColor([domBars[j], domBars[j + 1]], 'red');
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    this.setState({elements: array,});
                    await sleep(10);
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
                <Controls setSorter={this.handleSort} setSize={this.handleSize} 
                            resetArray={this.resetArray} isRunning={this.state.isRunning} />
            </Grid>
        )
    };

    resetArray() {
        const getRandomInt = (low, high) => {
            return Math.floor(Math.random() * (high - low + 1) + low);
        }

        const array = [];
        for(let i = 0; i < this.state.maxBars; ++i) {
            const height = getRandomInt(25, 500);
            array.push(<Element height={height} key={i} />);
        }

        const domBars = document.getElementsByClassName('bar');
        for(const bar of domBars) {
            bar.style.backgroundColor = 'gray';
        }

        this.setState({elements: array});
    }
}

export default Body
