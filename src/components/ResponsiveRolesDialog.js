import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {CRUD_ACTION} from "../constants";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    }
}));


export default function ResponsiveDialog({ open, onClose, onConfirm, action, role }) {
    const theme = useTheme();
    const classes = useStyles();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [name, setName] = useState(role.name || '');
    const [permissions, setPermissions] = useState(role.permissions || []);

    useEffect(() => {
        setName(role.name);
        setPermissions(role.permissions)
        },[role]);

    const {id} = role;

    const handleClose = () => {
        onClose();
    };

    const handleConfirm = () => {
        onConfirm({
            id,
            name,
            permissions
        });
        handleClose();
    };

    const handlePermissionsChange = (event) => {
        setPermissions(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const isView = action === CRUD_ACTION.READ;

    const getActions = () => (
        isView ? [
            <Button autoFocus onClick={handleClose} color="primary">
                Cerrar
            </Button>
        ] : [
            <Button autoFocus onClick={handleClose} color="primary">
                Cancelar
            </Button>,
            <Button onClick={handleConfirm} color="primary" autoFocus>
                Confirmar
            </Button>
        ]
    )

    return (
        role &&
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{name}</DialogTitle>
                <DialogContent>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField id="standard-basic" label="Nombre" onChange={handleNameChange} value={name} disabled={isView} />
                        <Autocomplete
                            multiple
                            id="tags-filled"
                            options={permissions}
                            defaultValue={permissions}
                            freeSolo
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip key={`${option}_${index}`}  variant="outlined" label={option} {...getTagProps({ index })} />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField {...params} variant="filled" label="freeSolo" placeholder="Permisos" />
                            )}
                            onChange={handlePermissionsChange}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    { getActions() }
                </DialogActions>
            </Dialog>
        </div>
    );
}