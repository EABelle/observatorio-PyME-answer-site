import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    footer: {
        height: 120,
    },
}));

export default function Footer() {

    const classes = useStyles();

    return (
        <footer className={classes.footer} />
    )
};