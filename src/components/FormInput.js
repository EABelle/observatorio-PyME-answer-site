import React from "react";
import {TextField} from "@material-ui/core";
import {QUESTION_TYPE} from "../constants";
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default function FormInput({
      id,
      type,
      onChange,
      value,
      name,
      required,
      options,
      restrictions,
      disabled,
      adornment,
      isCurrency,
      inputProps
}) {

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

    const handleCheckboxChange = (index) => {
        const newValue = new Set(value || []);
        if(isChecked(index)) {
            newValue.delete(index)
        } else {
            newValue.add(index)
        }
        onChange(Array.from(newValue));
    };

    const isChecked = index => {
        return value && value.find(i => i === index)
    };

    const getInputProps = () => (
        restrictions && {
            ...inputProps,
            min: String(restrictions.min),
            max: String(restrictions.max),
        }
    );

    const getMUIInputProps = () => (
        adornment && (
        isCurrency ? {
            InputProps: {
                startAdornment: <InputAdornment position="start">{adornment}</InputAdornment>,
            }
        } : {
            InputProps: {
                endAdornment: <InputAdornment position="end">{adornment}</InputAdornment>,
            }
        })
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

    if (type === QUESTION_TYPE.SELECT) {
        return(<FormControl>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                onChange={handleChange}
            >
                {
                    options.map((option, index) => <MenuItem key={index} value={index}>{option}</MenuItem>)
                }
            </Select>
        </FormControl>)
    }

    if (type === QUESTION_TYPE.MULTIPLE_CHOICE) {
        return (
            <FormControl component="fieldset" disabled={disabled}>
                <FormGroup>
                    {
                        options.map((option, index) =>
                            <FormControlLabel
                                key={index}
                                control={<Checkbox value={index} checked={isChecked(index)} onChange={() => handleCheckboxChange(index)} />}
                                label={option}
                            />)
                    }
                </FormGroup>
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
            {...getMUIInputProps()}
        />
    )
}