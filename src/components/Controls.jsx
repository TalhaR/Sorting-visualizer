import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100px',
        backgroundColor: 'grey',
    }
}));

function Controls() {
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={12} className={classes.root} component="section">
            
        </Grid>
    )
}

export default Controls
