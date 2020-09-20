import React from "react";
import {TextField} from "@material-ui/core";
import {QUESTION_TYPE} from "../constants";
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    groupRow: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
}));

export default function FormInput({id, groups, type, onChange, value, name, required, options, restrictions}) {

    const classes = useStyles();

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

    const handleGroupChange = (event, groupIndex) => {
        const newValue = Number(event.target.value);
        onChange(newValue, groupIndex);
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
            <FormControl component="fieldset">
                <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={value}
                    onChange={handleChange}>
                    {
                        options.map((option, index) => <FormControlLabel key={index} value={index} control={<Radio />} label={option} />)
                    }
                </RadioGroup>
            </FormControl>
        )
    }

    if (type === QUESTION_TYPE.GROUPED_CHOICE) {

        return (
            <>
                {
                    groups.map((group, groupIndex) => (
                        <FormControl component="fieldset" key={groupIndex}>
                            <RadioGroup
                                aria-label="gender"
                                name="gender1"
                                value={group.value}
                                onChange={(event) => handleGroupChange(event, groupIndex)}
                                className={classes.groupRow}
                                row
                            >
                                <span>{group.mandatory && '*'}{group.title}</span>
                                {
                                    options.map((option, index) =>
                                        <FormControlLabel
                                            key={index}
                                            value={index}
                                            control={<Radio />}
                                            label={option}
                                            labelPlacement="start"
                                        />)
                                }
                            </RadioGroup>
                        </FormControl>
                    ))
                }
            </>
        )
    }

    if (type === QUESTION_TYPE.FILE) {
        return (
            <Button
                variant="contained"
                component="label"
            >
                Subir archivo
                <input
                    type="file"
                    onChange={handleFilesChange}
                />
            </Button>
        )
    }

    return (
        <TextField
            variant="outlined"
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
            inputProps={getInputProps()}
        />
    )
}