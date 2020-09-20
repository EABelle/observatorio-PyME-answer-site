import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import FormInput from "./FormInput";

const useStyles = makeStyles(() => ({
    formInputContainer: {
        maxWidth: 540,
        marginBottom: 32,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    formInputTitle: {
        textAlign: 'left',
    }
}));

export default function FormQuestion({id, question, onChange}) {

    const classes = useStyles();

    const [value, setValue] = useState(question.value);
    const [groups, setGroups] = useState(question.groups);

    const handleChange = (newValue, groupIndex) => {
        if (groupIndex !== undefined) {
            groups[groupIndex].value = newValue;
            setGroups(groups);
        } else {
            setValue(newValue);
        }
        onChange(newValue, groups);
    }

    return (
        <div className={classes.formInputContainer}>
            <div className={classes.formInputTitle}>{question.mandatory && '*'}{question.title}</div>
            <FormInput
                onChange={handleChange}
                id={`${id}`}
                name={question.title}
                required={question.mandatory}
                value={value}
                type={question.type}
                options={question.options}
                restrictions={question.restrictions}
                groups={groups}
            />
        </div>
    )
}