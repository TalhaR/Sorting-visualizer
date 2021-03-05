import { Button, Grid, Slider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'grey',
    },
    arrayControls: {
        height: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    sortControls: {
        height: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    slider: {
        maxWidth: '60%',
    }
}));

function Controls({setSorter, setSize, resetArray, isRunning}) {
    const classes = useStyles();

    const selectSorter = (algorithm) => {
        console.log('button pressed');
        setSorter(algorithm);
    }

    return (
        <Grid container item xs={12} className={classes.root} component="section">
            <Grid item xs={12} sm={6} className={classes.arrayControls}>
                <Button color="primary" variant="contained" disabled={isRunning} onClick={() => resetArray()}>
                    Reset
                </Button>

                <Slider className={classes.slider} defaultValue={10} step={5} marks min={5} max={100} valueLabelDisplay="auto" disabled={isRunning} onChange={(e, value) => setSize(value)} />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.sortControls}>
                <Button color="primary" variant="contained" disabled={isRunning} onClick={() => selectSorter('bubble')}>
                    Bubble
                </Button>
                <Button color="primary" variant="contained" disabled={true} onClick={() => selectSorter('quick')}>
                    Quick
                </Button>
                <Button color="primary" variant="contained" disabled={true} onClick={() => selectSorter('merge')}>
                    Merge
                </Button>
                <Button color="primary" variant="contained" disabled={true} onClick={() => selectSorter('heap')}>
                    Heap
                </Button>

            </Grid>
        </Grid>
    )
}

export default Controls
