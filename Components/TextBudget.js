import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { AppContext } from '../App';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
    },
    title: {
        marginBottom: '6rem',
        textAlign: 'center',
    },
}));

function TextBudget() {
    const classes = useStyles();
    const { totalInc, totalExp, totalbudget } = useContext(AppContext);
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} gutterBottom>
                    Your total Budget is:- $ {totalbudget}
                </Typography>
                <Typography
                    className={classes.title}
                    color='primary'
                    gutterBottom>
                    Your total Income is:- $ {totalInc}
                </Typography>
                <Typography
                    className={classes.title}
                    color='secondary'
                    gutterBottom>
                    Your total Expense is:- $ {totalExp}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default TextBudget;
