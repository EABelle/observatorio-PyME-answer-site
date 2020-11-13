import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import * as PropTypes from "prop-types";
import React from "react";

export function MultipleChoiceInput(props) {
    return <FormControl component="fieldset" disabled={props.disabled}>
        <FormGroup>
            {
                props.map
            }
        </FormGroup>
    </FormControl>;
}

MultipleChoiceInput.propTypes = {
    disabled: PropTypes.any,
    map: PropTypes.any
};