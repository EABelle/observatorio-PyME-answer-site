
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography
} from '@material-ui/core';
import logo from "../logo.png";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(() => ({
    header: {
        backgroundImage: 'url(header-background.jpg)',
        height: 120,
    },
    items: {
        width: '90%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        margin: '0 auto',
        padding: '0 24px'
    },
    logo: {
        width: 155
    },
    userContainer: {
        textAlign: 'right'
    },
    logout: {
        cursor: 'pointer'
    }
}));

export default function Header({ onOpenMenu }) {

    const classes = useStyles();

    return (
        <header className={classes.header}>
            <div className={classes.items}>
                <IconButton
                    color="inherit"
                    aria-label="open menu"
                    onClick={onOpenMenu}
                    edge="start"
                >
                    <MenuIcon />
                </IconButton>
                <img src={logo} className={classes.logo} alt="logo" />
            </div>
        </header>
    )
};