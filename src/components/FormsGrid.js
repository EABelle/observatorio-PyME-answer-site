import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import LoadingBar from "./LoadingBar";
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import ListIcon from '@material-ui/icons/List';
import Grow from '@material-ui/core/Grow';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
    formSummaryCard: {
        width: 360,
        height: 72,
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        cursor: 'pointer',
        marginBottom: 16
    },
    formSummaryImage: {
        width: 56,
        height: 56,
        borderRadius: 4,
        backgroundColor: '#F6F6F6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowTitle: {
        marginLeft: 16,
        height: 72,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexGrow: 1,
        borderBottom: 'solid 1px #999999'
    },
    formsContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        flexGrow: 1,
    },
    pagination: {
            marginTop: 16
    },
    emptyState: {
        margin: '16px auto',
        width: '100%',
        textAlign: 'center'
    },
    error: {
        margin: '16px auto',
        width: '100%',
        textAlign: 'center',
        color: 'red'
    },
}));

export function FormsGrid({ forms, loading, error }) {

    const classes = useStyles();
    const history = useHistory();

    const getEmptyState = () => <div className={classes.emptyState}>No hay formularios</div>;

    if(loading)
        return <LoadingBar show />;
  
    if(error)
        return <div className={classes.error}>Ha ocurrido un error</div>;

    const getGrid = () => (
        <Grid container spacing={3}>
            {forms.map((form, index) => (
                <Grow
                    in
                    style={{ transformOrigin: '0' }}
                    timeout={1000 * (index + 1)}
                    key={form.id}
                    onClick={() => history.push(`/cuestionario/${form.id}`)}
                >
                    <Grid item  className={classes.formSummaryCard}>
                        <div className={classes.formSummaryImage} >
                            <ListIcon fontSize="large" />
                        </div>
                        <div className={classes.rowTitle}>
                            {form.name}
                        </div>
                    </Grid>
                </Grow>
            ))}
        </Grid>
    )

    return (
      <div className={classes.formsContainer}>
          { forms.length ? getGrid() : getEmptyState() }
      </div>
    );
}


FormsGrid.propTypes = {
  status: PropTypes.string
};