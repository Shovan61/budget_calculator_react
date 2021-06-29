import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Item from './Item';
import { AppContext } from '../App';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    header: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    incomelIst: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '45%',
        // border: '1px solid blue',
    },
    expenseLsit: {
        position: 'absolute',
        top: '42.2rem',
        left: '42rem',
        // border: '1px solid black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '45%',
    },
}));

function List() {
    const classes = useStyles();
    const { allInComes, allExpense } = useContext(AppContext);

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Typography
                    style={{ textAlign: 'center' }}
                    color='primary'
                    gutterBottom>
                    Income:-
                </Typography>
                <Typography
                    style={{ textAlign: 'center' }}
                    color='secondary'
                    gutterBottom>
                    Expense:-
                </Typography>
            </div>

            <div className={classes.incomelIst}>
                {allInComes.map((cur) => (
                    <Item {...cur} key={cur.id} />
                ))}
            </div>

            <div className={classes.expenseLsit}>
                {allExpense.map((cur) => (
                    <Item {...cur} key={cur.id} />
                ))}
            </div>
        </div>
    );
}

export default List;
