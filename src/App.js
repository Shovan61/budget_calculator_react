import React, { useState, useReducer, useEffect } from 'react';
import NavBar from './Components/NavBar';
import SearchField from './Components/SearchField';
import { makeStyles } from '@material-ui/core/styles';
import Budget from './Components/Budget';
import TextBudget from './Components/TextBudget';
import Divider from '@material-ui/core/Divider';
import List from './Components/List';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100vw',
    },
    upperContent: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    searchField: {
        width: '48%',
        marginLeft: '2rem',
        height: '10rem',
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'flex-end',
    },
    budget: {
        width: '45%',
        marginRight: '2rem',
        marginTop: '1.5rem',
    },
    textbdgt: {
        position: 'absolute',
        left: '2rem',
        top: '15rem',
        height: '23rem',
        width: '45%',
    },
    divider: {
        marginBottom: '1rem',
        marginTop: '1rem',
    },
    list: {
        marginLeft: '2rem',
        marginRight: '2rem',
    },
}));

export const AppContext = React.createContext();

function reducer(state, action) {
    switch (action.type) {
        case 'Add_Income':
            return {
                ...state,
                allInComes: [...state.allInComes, action.payload],
            };

        case 'Add_Expense':
            return {
                ...state,
                allExpense: [...state.allExpense, action.payload],
            };
        case 'Remove_Income':
            return {
                ...state,
                allInComes: state.allInComes.filter(
                    (cur) => cur.id !== action.payload
                ),
            };
        case 'Remove_Expense':
            return {
                ...state,
                allExpense: state.allExpense.filter(
                    (cur) => cur.id !== action.payload
                ),
            };
        case 'Edit_Income':
            return {
                ...state,
                allInComes: state.allInComes.map((curItem) => {
                    return curItem.id === action.payload.id
                        ? {
                              ...curItem,
                              name: action.payload.iName,
                              value: action.payload.iValue,
                          }
                        : curItem;
                }),
            };
        case 'Edit_Expense':
            return {
                ...state,
                allExpense: state.allExpense.map((curItem) => {
                    return curItem.id === action.payload.id
                        ? {
                              ...curItem,
                              name: action.payload.iName,
                              value: action.payload.iValue,
                          }
                        : curItem;
                }),
            };

        default:
            throw new Error('can not find dispatch type in App');
    }
}

function App() {
    const classes = useStyles();

    const [state, dispatch] = useReducer(reducer, {
        allInComes: [],
        allExpense: [],
    });
    const [totalbudget, settotalbudget] = useState(0);
    const [totalInc, settotalInc] = useState(0);
    const [totalExp, settotalExp] = useState(0);

    useEffect(() => {
        calcBudget();
    }, [state]);

    const calcBudget = () => {
        let inc = 0;
        let exp = 0;

        if (state.allInComes.length !== 0) {
            state.allInComes.forEach((cur) => {
                inc = inc + parseInt(cur.value);
            });
        }

        if (state.allExpense.length !== 0) {
            state.allExpense.forEach((cur) => {
                exp = exp + parseInt(cur.value);
            });
        }

        let bdgt = inc - exp;

        settotalInc(inc);
        settotalExp(exp);
        settotalbudget(bdgt);
    };

    const addItem = (item) => {
        if (item.category === 'income') {
            dispatch({ type: 'Add_Income', payload: item });
        } else if (item.category === 'expense') {
            dispatch({ type: 'Add_Expense', payload: item });
        }
    };

    const removeItem = (id) => {
        const mergeArr = state.allInComes.concat(state.allExpense);
        let itemType;
        mergeArr.forEach((curItem) => {
            if (curItem.id === id) {
                itemType = curItem.category;
            }
        });
        if (itemType === 'income') {
            dispatch({ type: 'Remove_Income', payload: id });
        } else if (itemType === 'expense') {
            dispatch({ type: 'Remove_Expense', payload: id });
        }
    };

    const editItem = (id, iName, iValue) => {
        const mergeArr = state.allInComes.concat(state.allExpense);
        let itemType;
        mergeArr.forEach((curItem) => {
            if (curItem.id === id) {
                itemType = curItem.category;
            }
        });
        if (itemType === 'income') {
            dispatch({ type: 'Edit_Income', payload: { id, iName, iValue } });
        } else if (itemType === 'expense') {
            dispatch({ type: 'Edit_Expense', payload: { id, iName, iValue } });
        }
    };

    return (
        <AppContext.Provider
            value={{
                allInComes: state.allInComes,
                allExpense: state.allExpense,
                removeItem: removeItem,
                editItem: editItem,
                totalInc: totalInc,
                totalbudget: totalbudget,
                totalExp: totalExp,
            }}>
            <div className={classes.nav}>
                <NavBar />
            </div>

            <div className={classes.upperContent}>
                <div className={classes.searchField}>
                    <SearchField addItem={addItem} />
                </div>
                <div className={classes.budget}>
                    <Budget />
                </div>
                <div className={classes.textbdgt}>
                    <TextBudget />
                </div>
            </div>
            <Divider className={classes.divider} />

            <div className={classes.list}>
                <List />
            </div>
        </AppContext.Provider>
    );
}

export default App;
