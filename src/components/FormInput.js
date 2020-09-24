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
import {makeStyles} from "@material-ui/core/styles";
import * as PropTypes from "prop-types";

const useStyles = isTextInput => makeStyles(() => ({
    uploadButtonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: '16px 0',
    },
    inputContainer: {
        maxWidth: !isTextInput && 380,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'flex-start'
    },
    formControl: {
        width: '100%'
    },
    disclaimer: {
        margin: '16px 0',
        padding: 4,
        border: 'solid 1px #888888',
        borderRadius: 4,
        color: '#888888',
        fontSize: 14
    }
}))();

function UploadFileInput(props) {
    return <div className={props.classes.uploadButtonContainer}>
        <Button
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
        </Button>
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

function MultipleChoiceInput(props) {
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

function SelectInput(props) {
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

function ChoiceInput(props) {
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
    inputProps,
    multiline,
    disclaimer
}) {

    const classes = useStyles(type === QUESTION_TYPE.TEXT);

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
        return Boolean(index !== undefined && value !== undefined && value.find(i => i === index) !== undefined);
    };

    const getInputProps = () => (
        {
            ...inputProps,
            ...(restrictions ? {
                min: String(restrictions.min),
                max: String(restrictions.max),
            } : {})

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

    function getInput() {
        if (type === QUESTION_TYPE.CHOICE) {
            return (
                <ChoiceInput disabled={disabled} value={value} onChange={handleChange}
                             map={options.map((option, index) => <FormControlLabel key={index} value={index}
                                                                                   control={<Radio/>}
                                                                                   label={option}/>)}/>
            )
        }

        if (type === QUESTION_TYPE.SELECT) {
            return (
                <SelectInput
                    className={classes.formControl}
                    value={value}
                    onChange={handleChange}
                    map={options.map((option, index) =>
                        <MenuItem
                            key={index}
                            value={index}>
                            {option}
                        </MenuItem>
                    )}
                />
            )
        }

        if (type === QUESTION_TYPE.MULTIPLE_CHOICE) {
            return (
                <MultipleChoiceInput disabled={disabled} map={options.map((option, index) =>
                    <FormControlLabel
                        key={index}
                        control={
                            <Checkbox
                                value={index}
                                checked={isChecked(index)}
                                onChange={() => handleCheckboxChange(index)}
                            />}
                        label={option}
                    />)}/>
            )
        }

        if (type === QUESTION_TYPE.FILE) {
            return (
                <UploadFileInput classes={classes} disabled={disabled} onChange={handleFilesChange} value={value}
                                 callbackfn={k => <div key={k}>{value[k].name}</div>}/>
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
                multiline={multiline}
                rows={multiline && 4}
                variant="outlined"
                inputProps={getInputProps()}
                {...getMUIInputProps()}
            />
        )
    }

    return <div className={classes.inputContainer}>
        {getInput()}
        {disclaimer && <div className={classes.disclaimer}>{disclaimer}</div>}
    </div>;
}