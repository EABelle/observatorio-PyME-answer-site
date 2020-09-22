import Fab from "@material-ui/core/Fab";
import SaveIcon from "@material-ui/icons/Save";
import SendIcon from "@material-ui/icons/Send";
import * as PropTypes from "prop-types";
import React from "react";

export function FormFABs(props) {
    return <div className={props.classes.FABs}>
        <div className={props.classes.FABContainer}>
            <Fab
                color="primary"
                aria-label="save"
                size="medium"
                className={props.classes.FAB}
                onClick={props.onClick}
            >
                <SaveIcon/>
            </Fab>
        </div>
        <div className={props.classes.FABContainer}>
            <Fab
                color="primary"
                variant="extended"
                aria-label="send"
                className={props.classes.FAB}
                disabled={!props.canSend}
                onClick={props.onClick1}
            >
                <SendIcon/>
                Enviar formulario
            </Fab>
        </div>
    </div>;
}

FormFABs.propTypes = {
    classes: PropTypes.any,
    onClick: PropTypes.func,
    canSend: PropTypes.bool,
    onClick1: PropTypes.func
};