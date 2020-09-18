import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { STATUS } from '../constants';
import Pagination from '@material-ui/lab/Pagination';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LoadingBar from "./LoadingBar";
import PropTypes from 'prop-types';
import { Edit, Visibility } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  rowTitle: {
    fontWeight: 'bold'
  },
  formsContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%'
  },
  pagination: {
      marginTop: 16
  },
  emptyState: {
      margin: '16px auto',
      width: '100%',
      textAlign: 'center'
  }
}));

const resolveFormStatusLabel = (status) => {
    return (
        status === STATUS.COMPLETE ? 'Completados'
        : status === STATUS.IN_PROGRESS ? 'En progreso'
        : 'Sin iniciar'
    );
};

export function FormsTable({ status, forms, loading, error, pages }) {
    const classes = useStyles();

    const title = resolveFormStatusLabel(status)
    const emptyState = <div className={classes.emptyState}>No hay formularios</div>;

    if(loading)
        return <LoadingBar show />;
  
    if(error)
        return <div>Ha ocurrido un error</div>;

    return (
      <div className={classes.formsContainer} >
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Título</TableCell>
                <TableCell align="right">Preguntas</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {forms.map((form) => (
                <TableRow key={form.id}>
                  <TableCell component="th" scope="row" className={classes.rowTitle}>
                    {form.name}
                  </TableCell>
                  <TableCell align="right">{form.questions.length}</TableCell>
                  <TableCell align="right">{form.status === STATUS.COMPLETE ? <Visibility /> : <Edit />}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination count={pages} className={classes.pagination} />
      </div>
    );
}


FormsTable.propTypes = {
  status: PropTypes.string
};