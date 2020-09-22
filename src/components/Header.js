
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography
} from '@material-ui/core';
import logo from "../logo.png";

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

export default function Header({ onLogout, account }) {

    const classes = useStyles();

    return (
        <header className={classes.header}>
            <div className={classes.items}>
                <img src={logo} className={classes.logo} alt="logo" />
                <div className={classes.userContainer}>
                    <Typography variant="subtitle1">{ `${account?.name} ${account?.lastName}` }</Typography>
                    <Typography variant="caption" className={classes.logout} onClick={onLogout}>Cerrar Sesión</Typography>
                </div>
            </div>
        </header>
    )
};