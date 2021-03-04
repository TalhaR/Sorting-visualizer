import React from 'react'
import { Grid } from '@material-ui/core'
import Controls from './Controls'
import Element from './Element'
import '../styles.css'

function sleep(ms) {
    console.log('waiting');
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Body extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            elements: [],
            isRunning: false,
        }
        this.bubbleSort = this.bubbleSort.bind(this);
        this.resetArray = this.resetArray.bind(this);
    }

    componentDidMount() {
        this.resetArray();
    }

    componentDidUpdate() {
        console.log('updated');
    }

    async bubbleSort() {
        this.setState({isRunning: true});
        const array = [...this.state.elements];
        const domBars = document.getElementsByClassName('bar');
        console.log('starting sort')

        for(let i = 0; i < array.length; ++i) {
            for(let j = 0; j < array.length - 1 - i; ++j) {
                // highlight comparing elements in green
                domBars[j].style.backgroundColor = 'green';
                domBars[j + 1].style.backgroundColor = 'green';
                await sleep(100);

                if (array[j].props.height > array[j + 1].props.height) {
                    // highlight swapping elements red
                    domBars[j].style.backgroundColor = 'red';
                    domBars[j + 1].style.backgroundColor = 'red';
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    this.setState({elements: array,});
                    await sleep(200);
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
                <Grid item xs={12} sm={10} md={8} className="visualization" component="section">
                    { this.state.elements }
                </Grid>
                <Controls setSorter={this.bubbleSort} resetArray={this.resetArray} isRunning={this.state.isRunning} />
            </Grid>
        )
    };

    resetArray() {
        const getRandomInt = (low, high) => {
            return Math.floor(Math.random() * (high - low + 1) + low);
        }

        const array = [];
        
        for(let i = 0; i < 10; ++i) {
            array.push(<Element height={getRandomInt(25, 500)} key={i} />);
        }

        const domBars = document.getElementsByClassName('bar');
        for(const bar of domBars) {
            bar.style.backgroundColor = 'gray';
        }

        this.setState({elements: array}, () => {
            console.log(this.state.elements)
        })
    }
}

export default Body
