import React, { useReducer, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { v4 as uuid } from 'uuid';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        width: '100%',
        height: '5rem',
        display: 'flex',
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: '3rem',
    },
    formControl: {
        width: '20%',
    },
    inputField: {
        width: '70%',
        display: 'flex',
    },
    alert: {
        marginTop: '1rem',
    },
}));

function reducer(state, action) {
    switch (action.type) {
        case 'Cat_Change':
            return { ...state, category: action.payload };
        case 'Name_Change':
            return { ...state, itemName: action.payload };
        case 'Value_change':
            return { ...state, itemValue: action.payload };
        case 'Alert':
            return { ...state, isAlert: action.payload };
        case 'Restart':
            return {
                category: 'income',
                itemName: '',
                itemValue: '',
                isAlert: false,
            };
        default:
            throw new Error('can not find dispatch type in searchField');
    }
}

function SearchField({ addItem }) {
    const classes = useStyles();

    const [state, dispatch] = useReducer(reducer, {
        category: 'income',
        itemName: '',
        itemValue: '',
        isAlert: false,
    });

    useEffect(() => {
        let timer = setTimeout(() => {
            dispatch({ type: 'Alert', payload: false });
        }, 2000);
        return () => {
            clearTimeout(timer);
        };
    }, [state.isAlert]);

    const handleCatgoryChange = (e) => {
        dispatch({ type: 'Cat_Change', payload: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newItem = {
            name: state.itemName,
            value: state.itemValue,
            id: uuid(),
            category: state.category,
        };
        if (state.itemName !== '' && state.itemValue !== '') {
            addItem(newItem);

            dispatch({ type: 'Restart', payload: null });
        } else {
            dispatch({ type: 'Alert', payload: true });
        }
    };

    return (
        <>
            {state.isAlert && (
                <div className={classes.alert}>
                    <Alert severity='error'>
                        Can not procced with Empty Field!
                    </Alert>
                </div>
            )}
            <form className={classes.root} onSubmit={handleSubmit}>
                <FormControl className={classes.formControl}>
                    <InputLabel id='category-select'>Category</InputLabel>
                    <Select
                        fullWidth
                        value={state.category}
                        labelId='category-select'
                        id='category-select'
                        onChange={handleCatgoryChange}>
                        <MenuItem value='income'>Income</MenuItem>
                        <MenuItem value='expense'>Expense</MenuItem>
                    </Select>
                </FormControl>
                <div className={classes.inputField}>
                    <TextField
                        style={{ marginRight: '10px', marginLeft: '10px' }}
                        fullWidth
                        type='text'
                        label='Item Name'
                        value={state.itemName}
                        onChange={(e) =>
                            dispatch({
                                type: 'Name_Change',
                                payload: e.target.value,
                            })
                        }
                    />
                    <TextField
                        style={{ marginRight: '10px' }}
                        fullWidth
                        type='number'
                        label='Enter Value'
                        value={state.itemValue}
                        onChange={(e) =>
                            dispatch({
                                type: 'Value_change',
                                payload: e.target.value,
                            })
                        }
                    />
                </div>
                <Button
                    disabled={state.isAlert}
                    type='submit'
                    variant='contained'
                    color='primary'>
                    Submit
                </Button>
            </form>
        </>
    );
}

export default SearchField;
