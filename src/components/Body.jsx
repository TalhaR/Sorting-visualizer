import React from 'react'
import { Grid } from '@material-ui/core'
import Controls from './Controls'
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
        const array = [...this.state.elements];
        console.log('starting sort')

        for(let i = 0; i < array.length; ++i) {
            for(let j = 0; j < array.length - 1 - i; ++j) {
                if (array[j] > array[j + 1]) {
                    console.log('before: ', array);
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    console.log('after: ', array);
                    this.setState({elements: array,})
                    this.forceUpdate();
                    await sleep(1000);
                }
            }
        }
        console.log('done sorting');
    };

    render() {
        return (
            <Grid container className="root" component="main">
                <Grid item xs={12} sm={10} md={8} className="visualization" component="section">
                    {this.state.elements.map((value, idx) => (
                        <div className="bar" key={idx} style={{height: `${value}px`}}></div>
                    ))}
                </Grid>
                <Controls setSorter={this.bubbleSort} resetArray={this.resetArray} />
            </Grid>
        )
    };

    resetArray() {
        const getRandomInt = (low, high) => {
            return Math.floor(Math.random() * (high - low + 1) + low);
        }

        const array = [];
        
        for(let i = 0; i < 5; ++i) {
            array.push(getRandomInt(25, 500));
        }
        this.setState({elements: array}, () => {
            console.log(this.state.elements)
        })
    }
}

export default Body
