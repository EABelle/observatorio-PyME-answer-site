import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: 24,
        [theme.breakpoints.up('lg')]: {
            marginLeft: 280,
            width: 'calc(100% - 400px)',
        },
    },
}));


export default function PageContainer({ children }) {

    const classes = useStyles();

    return (
        <Container component="main" className={classes.container}>
            { children }
        </Container>
    )
};