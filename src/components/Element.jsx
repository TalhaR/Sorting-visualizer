import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    bar: {
        backgroundColor: 'gray',
        border: '2px solid black',
        height: '100px',
        width: '50px',
        margin: '0px 10px',
    }
}));

function Element({height, width}) {
    const classes = useStyles();

    return (
        <div className={classes.bar} style={{ height: height, width: width}} >
            
        </div>
    )
}

export default Element
