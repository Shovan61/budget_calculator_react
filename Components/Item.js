import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import UpdateIcon from '@material-ui/icons/Update';
import { AppContext } from '../App';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemName: {
        marginLeft: '12px',
    },
    inputField: {
        width: '100%',
        display: 'flex',
        marginBottom: '2px',
    },
    button: {
        margin: theme.spacing(1),
    },
}));

function Item(props) {
    const classes = useStyles();
    const { name, id, category, value } = props;
    const [isEdit, setisEdit] = useState(false);
    const [newName, setnewName] = useState(name);
    const [newValue, setnewValue] = useState(value);
    const [isError, setisError] = useState(false);
    const { removeItem, editItem, calcBudget } = useContext(AppContext);

    useEffect(() => {
        let timer = setTimeout(() => {
            setisError(false);
        }, 1500);
        return () => {
            clearTimeout(timer);
        };
    }, [isError]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newName && newValue) {
            editItem(id, newName, newValue);

            setisEdit(false);
        } else {
            setisError(true);
        }
    };

    return (
        <Card className={classes.root}>
            {isEdit && (
                <form className={classes.inputField} onSubmit={handleSubmit}>
                    <TextField
                        error={isError}
                        style={{ marginRight: '10px', marginLeft: '10px' }}
                        fullWidth
                        type='text'
                        label={isError ? 'Both Input Required' : 'Enter Name'}
                        value={newName}
                        onChange={(e) => setnewName(e.target.value)}
                    />
                    <TextField
                        error={isError}
                        style={{ marginRight: '10px' }}
                        fullWidth
                        type='number'
                        label={isError ? 'Both Input Required' : 'Enter Value'}
                        value={newValue}
                        onChange={(e) => setnewValue(e.target.value)}
                    />
                    <IconButton aria-label='edit' type='submit'>
                        <UpdateIcon />
                    </IconButton>
                </form>
            )}
            {!isEdit && (
                <>
                    <Typography
                        className={classes.itemName}
                        align='left'
                        color={category === 'income' ? 'primary' : 'secondary'}
                        gutterBottom>
                        {name}
                    </Typography>
                    <Typography
                        className={classes.itemName}
                        color={category === 'income' ? 'primary' : 'secondary'}
                        gutterBottom>
                        ${value}
                    </Typography>
                    <CardActions>
                        {/* Edit Button */}
                        <IconButton
                            aria-label='edit'
                            onClick={() => setisEdit(true)}>
                            <EditIcon />
                        </IconButton>
                        {/* Remove Button */}
                        <IconButton
                            disabled={isError}
                            aria-label='delete'
                            onClick={() => removeItem(id)}>
                            <DeleteIcon />
                        </IconButton>
                    </CardActions>
                </>
            )}
        </Card>
    );
}

export default Item;
