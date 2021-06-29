import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

function NavBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar
                style={{ backgroundColor: '#444' }}
                color='primary'
                position='static'>
                <Toolbar variant='dense'>
                    <Typography variant='h6' color='inherit'>
                        Budget Calculator
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavBar;
