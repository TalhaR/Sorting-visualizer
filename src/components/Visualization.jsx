import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Element from './Element'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '900px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },

}));

function Visualization() {
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={10} md={8} 
        className={classes.root} component="section">
            <Element />
            <Element />
            <Element />
            <Element />
            <Element />
        </Grid>
    )
}

export default Visualization
