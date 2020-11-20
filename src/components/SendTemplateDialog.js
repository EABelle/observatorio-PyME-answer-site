import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import * as PropTypes from "prop-types";
import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import {makeStyles, useTheme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    }
}));

export function SendTemplateDialog(props) {

    const classes = useStyles();
    const [usersToSend, setUsersToSend] = useState([]);

    const handleChange = (event) => {
        const value = event.target.value;
        setUsersToSend(value);
    }

    function getUserIdsFromEmails() {
        usersToSend.map(email => props.users.find(user => user.email === email).id)
    }

    return <Dialog
        open={props.open}
        keepMounted
        onClose={props.onClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
    >
        <DialogTitle id="alert-dialog-slide-title">Enviar encuesta a usuarios</DialogTitle>
        <DialogContent>
            <form className={classes.root} noValidate autoComplete="on">
                <Autocomplete
                    multiple
                    id="tags-filled"
                    options={['email1', ...props.users.map(user => user.email)]}
                    defaultValue={[]}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip key={`${option}_${index}`}  variant="outlined" label={option} {...getTagProps({ index })} />
                        ))
                    }
                    renderInput={(params) => {
                        return (
                            <TextField {...params} variant="filled" placeholder="Usuarios a enviar" />
                        )}}
                    onChange={handleChange}
                />
            </form>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.onClose} color="primary">
                Cancelar
            </Button>
            <Button onClick={() => props.onSend(props.templateId, getUserIdsFromEmails())} color="primary">
                Enviar
            </Button>
            <Button onClick={props.onOpenConfirm} color="secondary">
                Enviar a todos
            </Button>
        </DialogActions>
    </Dialog>;
}

SendTemplateDialog.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onClick: PropTypes.func
};