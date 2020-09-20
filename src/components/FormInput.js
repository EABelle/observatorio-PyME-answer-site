import React from "react";
import {TextField} from "@material-ui/core";
import {QUESTION_TYPE} from "../constants";
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export default function FormInput({id, type, onChange, value, name, required, options, restrictions, disabled}) {

    const handleChange = (event) => {
        let newValue = event.target.value;
        if (
            type === QUESTION_TYPE.CHOICE ||
            type === QUESTION_TYPE.NUMBER
        ) {
            newValue = Number(newValue);
        }
        onChange(newValue);
    };

    const handleFilesChange = (event) => {
        const newValue = event.target.files;
        onChange(newValue);
    };

    const getInputProps = () => (
        restrictions && {
            min: String(restrictions.min),
            max: String(restrictions.max),
        }
    );

    if (type === QUESTION_TYPE.CHOICE) {
        return (
            <FormControl component="fieldset" disabled={disabled}>
                <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={value}
                    onChange={handleChange}
                >
                    {
                        options.map((option, index) => <FormControlLabel key={index} value={index} control={<Radio />} label={option} />)
                    }
                </RadioGroup>
            </FormControl>
        )
    }

    if (type === QUESTION_TYPE.FILE) {
        return (
            <div>
                <Button
                    disabled={disabled}
                    color="primary"
                    variant="contained"
                    component="label"
                >
                    Subir archivo
                    <input
                        type="file"
                        onChange={handleFilesChange}
                        style={{display: 'none'}}
                        multiple
                    />
                </Button>
                { value && Object.keys(value).map(k => <div key={k}>{value[k].name}</div>)}
            </div>
        )
    }

    return (
        <TextField
            margin="normal"
            required={required}
            fullWidth
            id={`${id}`}
            label="Respuesta"
            name={name}
            autoFocus
            value={value}
            onChange={handleChange}
            type={type}
            disabled={disabled}
            inputProps={getInputProps()}
        />
    )
}