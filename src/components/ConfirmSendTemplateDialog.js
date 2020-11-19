import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import * as PropTypes from "prop-types";
import React from "react";

export function ConfirmSendTemplateDialog(props) {

    return <Dialog
        open={props.open}
        keepMounted
        onClose={props.onClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
    >
        <DialogTitle id="alert-dialog-slide-title">Confirmar envío masivo</DialogTitle>
        <DialogContent>
            ¿Confirma el envío a todos los usuarios?
        </DialogContent>
        <DialogActions>
            <Button onClick={props.onClose} color="primary">
                Cancelar
            </Button>
            <Button onClick={() => props.onSend(props.templateId, null)} color="secondary">
                Enviar a todos
            </Button>
        </DialogActions>
    </Dialog>;
}

ConfirmSendTemplateDialog.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onClick: PropTypes.func
};