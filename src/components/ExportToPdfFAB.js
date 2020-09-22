import Fab from "@material-ui/core/Fab";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import * as PropTypes from "prop-types";
import React from "react";

export function ExportToPdfFAB(props) {
    return <div className={props.classes.FABs}>
        <div className={props.classes.FABContainer}>
            <Fab
                color="primary"
                aria-label="save"
                className={props.classes.FAB}
                onClick={props.onClick}
            >
                <PictureAsPdfIcon/>
            </Fab>
        </div>
    </div>;
}

ExportToPdfFAB.propTypes = {
    classes: PropTypes.any,
    onClick: PropTypes.any
};