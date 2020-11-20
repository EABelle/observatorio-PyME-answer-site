import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { FormsAccordion } from "../components/FormsAccordion"
import { STATUS } from "../constants";
import PageContainer from "../components/PageContainer";

const useStyles = makeStyles(() => ({
    mapContainer: {
        width: '50%'
    },
    title: {
        marginBottom: 24
    }
}));

export default function MyForms() {

    const classes = useStyles();

    return (
        <PageContainer>
            <Typography variant="h5" align="left" className={classes.title}>Mis cuestionarios</Typography>
            <FormsAccordion status={STATUS.NOT_STARTED} />
            <FormsAccordion status={STATUS.IN_PROGRESS} />
            <FormsAccordion status={STATUS.COMPLETE} />
        </PageContainer>
    )
};