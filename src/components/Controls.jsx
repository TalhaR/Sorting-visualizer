import { Button, Grid, Slider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#282c34',
    },
    arrayControls: {
        height: '100px',
        justifyContent: 'space-evenly',
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
        [theme.breakpoints.up('md')]: {
            '& > *': {
                margin: theme.spacing(2),
            },
        }
    },
    slider: {}
}));

function Controls({setSorter, setSize, setSpeed, resetArray, isRunning, haltSort}) {
    const classes = useStyles();

    const handleReset = () => {
        isRunning ? haltSort() : resetArray();
    }

    return (
        <Grid container item xs={12} className={classes.root} component="section">
            <Grid container item xs={12} sm={6} className={classes.arrayControls}>
                <Grid item>
                    <Button color="primary" variant="contained" onClick={handleReset}>
                        { isRunning? <>Stop</> : <>Reset</> }
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
                <Button color="primary" variant="contained" disabled={isRunning} onClick={() => setSorter('bubble')}>
                    Bubble
                </Button>
                <Button color="primary" variant="contained" disabled={isRunning} onClick={() => setSorter('quick')}>
                    Quick
                </Button>
                <Button color="primary" variant="contained" disabled={isRunning} onClick={() => setSorter('merge')}>
                    Merge
                </Button>
                <Button color="primary" variant="contained" disabled={isRunning} onClick={() => setSorter('heap')}>
                    Heap
                </Button>
            </Grid>
        </Grid>
    )
}

export default Controls
