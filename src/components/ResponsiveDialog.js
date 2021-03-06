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
import {MultipleSelect} from "./MultipleSelect";
import {CRUD_ACTION, CRUD_ACTION_MESSAGE} from "../constants";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    }
}));


export default function ResponsiveDialog({ open, onClose, onConfirm, action, user, allRoles }) {
    const theme = useTheme();
    const classes = useStyles();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [name, setName] = useState(user.name || '');
    const [email, setEmail] = useState(user.email || '');
    const [roles, setRoles] = useState(user.roles || []);

    useEffect(() => {
        setName(user.name || '');
        setEmail(user.email || '');
        setRoles(user.roles || []);
    },[user]);

    const {company, id} = user;

    const handleClose = () => {
        onClose();
    };

    const handleConfirm = () => {
        onConfirm({
            id,
            company,
            name,
            email,
            roles
        });
        handleClose();
    };

    const handleRolesChange = (event) => {
        setRoles(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
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
        user &&
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{CRUD_ACTION_MESSAGE[action]} Usuario</DialogTitle>
                <DialogContent>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField id="standard-basic" label="Nombre" onChange={handleNameChange} value={name} disabled={isView} />
                        <TextField id="standard-basic" label="Email" onChange={handleEmailChange} value={email} disabled={isView} />
                        <TextField id="standard-basic" label="Empresa" value={company?.name} disabled/>
                        <MultipleSelect value={roles} onChange={handleRolesChange} options={allRoles} disabled={isView} label="Roles" />
                    </form>
                </DialogContent>
                <DialogActions>
                    { getActions() }
                </DialogActions>
            </Dialog>
    );
}