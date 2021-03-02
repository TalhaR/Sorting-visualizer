import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '900px',
    }
}));

function Visualization() {
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={10} md={8} className={classes.root} component="section">
            
        </Grid>
    )
}

export default Visualization
