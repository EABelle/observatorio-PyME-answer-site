import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import * as PropTypes from "prop-types";
import React from "react";

export function SendFormDialog(props) {
    return <Dialog
        open={props.open}
        keepMounted
        onClose={props.onClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
    >
        <DialogTitle id="alert-dialog-slide-title">¿Confirma el envío el formulario?</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                Esta opción no se puede deshacer.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.onClose} color="primary">
                Cancelar
            </Button>
            <Button onClick={props.onClick} color="primary">
                Confirmar
            </Button>
        </DialogActions>
    </Dialog>;
}

SendFormDialog.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onClick: PropTypes.func
};