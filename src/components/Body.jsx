import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Controls from './Controls'
import Visualization from './Visualization'


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'darkgrey',
        height: '1000px',
        justifyContent: 'center'
    }
}));

function Body() {
    const classes = useStyles();

    return (
        <Grid container className={classes.root} component="main">
            <Visualization />
            <Controls />
        </Grid>
    )
}

export default Body
