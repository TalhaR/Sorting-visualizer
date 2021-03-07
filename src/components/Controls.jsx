import { Button, Grid, Slider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#282c34',
    },
    arrayControls: {
        height: '100px',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
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
    }
}));

function Controls({setSorter, setSize, setSpeed, resetArray, isRunning}) {
    const classes = useStyles();

    const selectSorter = (algorithm) => {
        setSorter(algorithm);
    }

    return (
        <Grid container item xs={12} className={classes.root} component="section">
            <Grid container item xs={12} sm={6} className={classes.arrayControls}>
                <Grid item>
                    <Button color="primary" variant="contained" disabled={isRunning} onClick={() => resetArray()}>
                        Reset
                    </Button>
                </Grid>
                <Grid item xs={7} md={8}>

                    <Slider className={classes.slider} defaultValue={10} step={5} marks min={5} max={100} 
                            valueLabelDisplay="auto" disabled={isRunning} onChange={(e, value) => setSize(value)} />

                    <Slider className={classes.slider} defaultValue={2} step={1} marks min={1} max={10} 
                            valueLabelDisplay="auto" onChangeCommitted={(e, value) => setSpeed(value)} />
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.sortControls}>
                <Button color="primary" variant="contained" disabled={isRunning} onClick={() => selectSorter('bubble')}>
                    Bubble
                </Button>
                <Button color="primary" variant="contained" disabled={isRunning} onClick={() => selectSorter('quick')}>
                    Quick
                </Button>
                <Button color="primary" variant="contained" disabled={isRunning} onClick={() => selectSorter('merge')}>
                    Merge
                </Button>
                <Button color="primary" variant="contained" disabled={isRunning} onClick={() => selectSorter('heap')}>
                    Heap
                </Button>
            </Grid>
        </Grid>
    )
}

export default Controls
