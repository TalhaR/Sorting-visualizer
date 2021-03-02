import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
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
    const [Sorter, setSorter] = useState(null);

    return (
        <Grid container className={classes.root} component="main">
            <Visualization Sorter={Sorter} setSorter={setSorter} />
            <Controls setSorter={setSorter} />
        </Grid>
    )
}

export default Body
