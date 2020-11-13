import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import * as PropTypes from "prop-types";
import React from "react";

export function SelectInput(props) {
    return (
        <FormControl className={props.className}>
            <Select
                labelId="select-label"
                id="select"
                value={props.value}
                onChange={props.onChange}
                variant="outlined"
            >
                {
                    props.map
                }
            </Select>
        </FormControl>
    );
}

SelectInput.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    map: PropTypes.any
};