import { Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
        padding: '3% 0%',
    }
}));

function Header() {
    const classes = useStyles();

    return (
        <header className={classes.root}>
            <Typography variant="h2">
                <small>Sorting Visualizer</small>
            </Typography>
        </header>
    );
}

export default Header;
