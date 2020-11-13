import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import * as PropTypes from "prop-types";
import React from "react";

export function ChoiceInput(props) {
    return <FormControl component="fieldset" disabled={props.disabled}>
        <RadioGroup
            aria-label="gender"
            name="gender1"
            value={props.value}
            onChange={props.onChange}
        >
            {
                props.map
            }
        </RadioGroup>
    </FormControl>;
}

ChoiceInput.propTypes = {
    disabled: PropTypes.any,
    value: PropTypes.any,
    onChange: PropTypes.func,
    map: PropTypes.any
};