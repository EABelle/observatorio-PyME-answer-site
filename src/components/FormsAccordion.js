import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { STATUS } from '../constants';
import FormService from "../services/FormService";
import PropTypes from 'prop-types';
import LoadingBar from "./LoadingBar";
import { FormsTable } from "./FormsTable";

const useStyles = status => makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 'bold',
    color: status === STATUS.COMPLETE ? 'green' : 
    status === STATUS.IN_PROGRESS ? 'orange' : 'red'
  }
}));

const resolveFormStatusLabel = (status) => {
    return (
        status === STATUS.COMPLETE ? 'Completados'
        : status === STATUS.IN_PROGRESS ? 'En progreso'
        : 'Sin iniciar'
    );
};

export function FormsAccordion({ status }) {
    const classes = useStyles(status)();
    const [expanded, setExpanded] = React.useState(true);
  
    const handleChange = () => {
      setExpanded((prevExpanded) => !prevExpanded);
    };

    useEffect(() => {
        fetchMyForms();
    }, []);

    const [ forms, setForms ] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [pages, setPages] = useState(0);

    const fetchMyForms = () => {
        setError(false);
        setLoading(true);
        FormService.getMyFormsByStatus(status)
            .then(({data, totalPages}) => {
                setLoading(false);
                setForms(data);
                setPages(totalPages);
            })
            .catch(() => {
                setLoading(false);
                setError(true);
            });
    };

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
                <FormsTable {...{ status, forms, loading, error, pages }} />
            </AccordionDetails>
        </Accordion>
    );
}


FormsAccordion.propTypes = {
status: PropTypes.string
};