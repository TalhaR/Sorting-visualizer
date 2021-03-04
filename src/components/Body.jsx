import { Grid } from '@material-ui/core'
import { useEffect, useState } from 'react';
import Controls from './Controls'
import '../styles.css'

function sleep(ms) {
    // console.log('waiting');
    return new Promise(resolve => setTimeout(resolve, ms));
}

const Body = () => {
    const [elements, setElements] = useState(() => [
        100, 150, 75, 150, 70
    ]);

    useEffect(() => {
        console.log('updating elements array');
    }, [elements]);

    const bubbleSort = async () => {
        const array = [...elements];
        console.log('starting sort')

        for(let i = 0; i < array.length; ++i) {
            for(let j = 0; j < array.length - 1 - i; ++j) {
                if (array[j] > array[j + 1]) {
                    console.log('before: ', array);
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    console.log('after: ', array);
                }
                setElements(array);
            }
        }
        console.log('done sorting');
    };

    return (
        <Grid container className="root" component="main">
            <Grid item xs={12} sm={10} md={8} className="visualization" component="section">
                {elements.map((value, idx) => (
                    <div className="bar" key={idx} style={{height: `${value}px`}}></div>
                ))}
            </Grid>
            <Controls setSorter={bubbleSort} />
        </Grid>
    )
}

export default Body
