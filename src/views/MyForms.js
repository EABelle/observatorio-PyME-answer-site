
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import { FormsAccordion } from "../components/FormsAccordion"
import { STATUS } from "../constants";

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: 24,
        [theme.breakpoints.up('lg')]: {
            marginTop: 24
        }
    },
    mapContainer: {
        width: '50%'
    },
    title: {
        marginBottom: 24
    }
}));

export default () => {

    const classes = useStyles();

    return (
        <Container component="main" className={classes.container}>
            <Typography variant="h5" align="left" className={classes.title}>Mis cuestionarios</Typography>
            <FormsAccordion status={STATUS.NOT_STARTED} />
            <FormsAccordion status={STATUS.IN_PROGRESS} />
            <FormsAccordion status={STATUS.COMPLETE} />
        </Container>
    )
};