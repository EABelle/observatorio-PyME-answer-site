
import React from "react";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function FormSnackbar({ message, onClose }) {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={!!message}
            autoHideDuration={3000}
            onClose={onClose}
            message={message}
            action={
                <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
            }
        />
    )
};