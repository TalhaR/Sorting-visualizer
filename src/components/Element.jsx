import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'gray',
        border: '2px solid black',
        height: '100px',
        width: '50px',
        margin: '0px 10px'
    },
    
}));

function Element({height, width}) {
    const classes = useStyles();

    return (
        <div className={classes.root} style={{ height: height, width: width}} >
            
        </div>
    )
}

export default Element
