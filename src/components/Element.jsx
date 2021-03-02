import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'gray',
        border: '2px solid black',
        height: '50px',
        width: '30px',
        margin: '0px 10px'
    },
    
}));

function Element({height, width}) {
    const classes = useStyles();

    return (
        <div className={classes.root} >
            
        </div>
    )
}

export default Element
