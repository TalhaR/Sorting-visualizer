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

function Controls() {
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={12} className={classes.root} component="section">
            <Button color="primary" variant="contained">
                Bubble
            </Button>
        </Grid>
    )
}

export default Controls
