import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CanvasJSChart } from 'canvasjs-react-charts';
import { AppContext } from '../App';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    title: {
        textAlign: 'center',
        marginBottom: '1rem',
    },
});

function Budget() {
    const classes = useStyles();
    const { totalInc, totalExp, totalbudget } = useContext(AppContext);
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography
                    className={classes.title}
                    color='textSecondary'
                    gutterBottom>
                    Total Income: $ {totalInc}
                </Typography>
                <Typography color='textSecondary' gutterBottom>
                    Total Budget: $ {totalbudget}
                </Typography>
                <Typography color='textSecondary' gutterBottom>
                    Total Expense: $ {totalExp}
                </Typography>
                <CanvasJSChart
                    options={{
                        animationEnabled: true,
                        exportEnabled: true,

                        data: [
                            {
                                type: 'pie',
                                indexLabel: '{label}: {y}%',
                                startAngle: -90,
                                dataPoints: [
                                    {
                                        y:
                                            totalbudget === 0
                                                ? 50
                                                : (totalInc / totalbudget) *
                                                  100,
                                        label: 'Income',
                                    },
                                    {
                                        y:
                                            totalbudget === 0
                                                ? 50
                                                : (totalExp / totalbudget) *
                                                  100,
                                        label: 'Expense',
                                    },
                                ],
                            },
                        ],
                    }}
                />
            </CardContent>
        </Card>
    );
}

export default Budget;
