import React from 'react'
import { Grid } from '@material-ui/core'
import Controls from './Controls'
import Element from './Element'
import '../styles.css'

function sleep(ms) {
    // console.log('waiting');
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Body extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            elements: [],
            isRunning: false,
            maxBars: 10,
        }
        this.bubbleSort = this.bubbleSort.bind(this);
        this.resetArray = this.resetArray.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleSize = this.handleSize.bind(this);
    }

    componentDidMount() {
        this.resetArray();
    }

    componentDidUpdate() {
        console.log('updated');
    }

    handleSize(num) {
        if (num === this.state.maxBars) return;
        console.log(num);

        this.setState({maxBars: num,});
        this.resetArray();
    }

    handleSort(algorithm) {
        this.setState({isRunning: true,});
        switch (algorithm) {
            case 'bubble':
                this.bubbleSort();
                break;
            case 'quick':
                break;
            case 'merge':
                break;
            case 'heap':
                break;
            default:
                console.log('unexpected parameter for handleSort');
                this.setState({isRunning: false,});
        }
    }

    async bubbleSort() {
        const array = [...this.state.elements];
        const domBars = document.getElementsByClassName('bar');
        console.log('starting sort')

        for(let i = 0; i < array.length; ++i) {
            for(let j = 0; j < array.length - 1 - i; ++j) {
                // highlight comparing elements in green
                domBars[j].style.backgroundColor = 'green';
                domBars[j + 1].style.backgroundColor = 'green';
                await sleep(10);

                if (array[j].props.height > array[j + 1].props.height) {
                    // highlight swapping elements red
                    domBars[j].style.backgroundColor = 'red';
                    domBars[j + 1].style.backgroundColor = 'red';
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    this.setState({elements: array,});
                    await sleep(25);
                } 
                // post-swap reset to normal
                domBars[j].style.backgroundColor = 'gray';
                domBars[j + 1].style.backgroundColor = 'gray';
            }
            // sorted elements in purple
            domBars[array.length - 1 - i].style.backgroundColor = 'purple';
        }

        this.setState({isRunning: false});
        console.log('done sorting');
    };

    render() {
        return (
            <Grid container className="root" component="main">
                <Grid item xs={12} md={11} className="visualization" component="section">
                    { this.state.elements }
                </Grid>
                <Controls setSorter={this.handleSort} setSize={this.handleSize} resetArray={this.resetArray} isRunning={this.state.isRunning} />
            </Grid>
        )
    };

    resetArray() {
        const getRandomInt = (low, high) => {
            return Math.floor(Math.random() * (high - low + 1) + low);
        }

        const array = [];
        for(let i = 0; i < this.state.maxBars; ++i) {
            array.push(<Element height={getRandomInt(25, 500)} key={i} />);
        }

        const domBars = document.getElementsByClassName('bar');
        for(const bar of domBars) {
            bar.style.backgroundColor = 'gray';
        }

        this.setState({elements: array}, () => console.log(this.state.elements));
    }
}

export default Body
