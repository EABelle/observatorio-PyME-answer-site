import React, {useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormService from "../services/FormService";
import PropTypes from 'prop-types';
import LoadingBar from "./LoadingBar";
import {FormsGrid} from "./FormsGrid";
import {getColorFromLabel, resolveFormStatusLabel} from "../utils";

const useStyles = status => makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 'bold',
    color: getColorFromLabel(status)
  }
}));

export function FormsAccordion({ status }) {
    const classes = useStyles(status)();
    const [expanded, setExpanded] = React.useState(true);
  
    const handleChange = () => {
      setExpanded((prevExpanded) => !prevExpanded);
    };

    const [ forms, setForms ] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);

    const fetchMyForms = async () => {
        if(hasFetched) {
            return;
        }
        setError(false);
        setLoading(true);
        try {
            const { data: response } = await FormService.getMyFormsByStatus(status);
            setLoading(false);
            setError(false);
            setForms(response);
        } catch(e) {
            setLoading(false);
            setError(true);
        }
        setHasFetched(true);
    };

    useEffect(() => {
        fetchMyForms();
    }, [hasFetched]);


    const title = resolveFormStatusLabel(status)

    if(loading)
        return <LoadingBar show />;
  
    if(error)
        return <div>Ha ocurrido un error</div>;

    return (
        <Accordion expanded={expanded} onChange={handleChange}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${status}-content`}
                id={`panel-${status}-header`}
            >
                <Typography className={classes.heading}>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FormsGrid {...{ status, forms, loading, error }} />
            </AccordionDetails>
        </Accordion>
    );
}


FormsAccordion.propTypes = {
status: PropTypes.string
};