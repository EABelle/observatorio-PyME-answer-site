import Button from "@material-ui/core/Button";
import * as PropTypes from "prop-types";
import React from "react";

export function UploadFileInput(props) {
    return <div className={props.classes.uploadButtonContainer}>
        {!props.disabled && <Button
            disabled={props.disabled}
            color="primary"
            variant="contained"
            component="label"
        >
            Subir archivo
            <input
                type="file"
                onChange={props.onChange}
                style={{display: "none"}}
                multiple
            />
        </Button>}
        {props.value && Object.keys(props.value).map(props.callbackfn)}
    </div>;
}

UploadFileInput.propTypes = {
    classes: PropTypes.any,
    disabled: PropTypes.any,
    onChange: PropTypes.func,
    value: PropTypes.any,
    callbackfn: PropTypes.func
};