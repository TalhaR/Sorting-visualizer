import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100px',
        backgroundColor: 'grey',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    }
}));

function Controls({setSorter, resetArray}) {
    const classes = useStyles();

    const selectSorter = (algorithm) => {
        console.log('button pressed');
        setSorter(algorithm);
    }

    return (
        <Grid item xs={12} sm={12} className={classes.root} component="section">
            <Button color="primary" variant="contained" onClick={() => resetArray()}>
                Reset
            </Button>
            <Button color="primary" variant="contained" onClick={() => selectSorter('bubble')}>
                Bubble
            </Button>
        </Grid>
    )
}

export default Controls
