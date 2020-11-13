import React from "react";
import {TextField} from "@material-ui/core";
import {QUESTION_TYPE} from "../../constants";
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from "@material-ui/core/styles";
import {MultipleChoiceInput} from "./MultipleChoiceInput";
import {SelectInput} from "./SelectInput";
import {ChoiceInput} from "./ChoiceInput";
import {UploadFileInput} from "./UploadFileInput";

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
        const files = event.target.files;
        onChange(files);
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
                <MultipleChoiceInput
                    disabled={disabled}
                    options={options}
                    map={options.map((option, index) =>
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
                <UploadFileInput
                    classes={classes}
                    disabled={disabled}
                    onChange={handleFilesChange}
                    value={value}
                    callbackfn={k => <div key={k}>{value[k].name}</div>}
                />
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