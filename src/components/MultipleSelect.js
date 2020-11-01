import {makeStyles, useTheme} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from '@material-ui/core/Chip';
import React from "react";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
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

export function MultipleSelect({value, onChange, options, disabled, label}) {
    const theme = useTheme();
    const classes = useStyles();
    return <FormControl className={classes.formControl}>
        <InputLabel id="multiple-input-label">{label}</InputLabel>
        <Select
            labelId="multiple-input-label"
            id="multiple-input"
            multiple
            value={value}
            onChange={onChange}
            input={<Input id="select-multiple-input"/>}
            MenuProps={MenuProps}
            disabled={disabled}
            renderValue={(selected) => (
                <div className={classes.chips}>
                    {selected.map((value) => (
                        <Chip key={value} label={value} className={classes.chip} />
                    ))}
                </div>
            )}
        >
            {options.map((option) => (
                <MenuItem key={option} value={option} style={getStyles(option, value, theme)}>
                    {option}
                </MenuItem>
            ))}
        </Select>
    </FormControl>;
}