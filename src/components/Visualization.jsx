import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import Element from './Element'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '900px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },

}));

function Visualization({Sorter, setSorter}) {
    const classes = useStyles();
    const [elements, setElements] = useState(() => [
        <Element key="100px" height="100px" />,
        <Element key="150px" height="150px" />,
        <Element key="75px" height="75px" />,
        <Element key="155px" height="155px" />,
        <Element key="70px" height="70px"/>,
    ]);

    useEffect(() => {
        console.log('updated');

        if (Sorter === null) return;
        if (Sorter === 'bubble') {
            const clone = [...elements];
            setSorter(null);

            for(let i = 0; i < clone.length; ++i) {
                for(let j = 0; j < clone.length - 1 - i; ++j) {
                    if (parseInt(clone[j].props.height) > parseInt(clone[j + 1].props.height)) {
                        [clone[j], clone[j + 1]] = [clone[j + 1], clone[j]];
                    }
                }
            }
            setElements(clone);
        }
    }, [elements, Sorter, setSorter])

    return (
        <Grid item xs={12} sm={10} md={8} className={classes.root} component="section">
            { elements }
        </Grid>
    )
}

export default Visualization
