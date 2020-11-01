import {makeStyles, useTheme} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    }
}));


function getStyles(name, users, theme) {
    return users && {
        fontWeight:
            users.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export function MultipleSelect({value, onChange, options, disabled}) {
    const theme = useTheme();
    const classes = useStyles();
    return <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
        <Select
            labelId="demo-mutiple-chip-label"
            id="demo-mutiple-chip"
            multiple
            value={value}
            onChange={onChange}
            input={<Input id="select-multiple-chip"/>}
            MenuProps={MenuProps}
            disabled={disabled}
        >
            {options.map((option) => (
                <MenuItem key={option} value={option} style={getStyles(option, value, theme)}>
                    {option}
                </MenuItem>
            ))}
        </Select>
    </FormControl>;
}