
import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import {CustomNoRowsOverlay} from "../components/NoRowsOverlay";
import IconButton from '@material-ui/core/IconButton';
import ViewIcon from '@material-ui/icons/Visibility';
import ResponsiveDialog from "../components/ResponsiveDialog";
import AddIcon from "@material-ui/icons/Add";
import {CRUD_ACTION} from "../constants";
import Button from '@material-ui/core/Button';
import FormService from "../services/FormService";
import {getColorFromLabel, resolveFormStatusLabel} from "../utils";

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: 24,
        [theme.breakpoints.up('lg')]: {
            marginTop: 24
        }
    },
    head: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mapContainer: {
        width: '50%'
    },
    button: {
        margin: theme.spacing(1),
    },
}));


export default () => {

    const classes = useStyles();

    const [ polls, setPolls ] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [filter, setFilter] = useState({});

    const fetchMyForms = () => {
        setError(false);
        setLoading(true);
        FormService.getForms(filter)
            .then(({data}) => {
                setLoading(false);
                setPolls(data);
            })
            .catch(() => {
                setLoading(false);
                setError(true);
            });
    };

    useEffect(() => {
        fetchMyForms();
    }, []);

    const handleViewPoll = (id) => {};

    const columns = [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'title', headerName: 'Título', width: 200 },
        { field: 'email', headerName: 'email usuario', width: 200 },
        { field: 'company', headerName: 'Empresa',  width: 200 },
        { field: 'created', headerName: 'Creada',  width: 200 },
        { field: 'modified', headerName: 'Modificada',  width: 200 },
        { field: 'status', headerName: 'Estado',  width: 200 },
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 200,
            renderCell: (params) => {
                const id = params.value;
                return ([
                    <IconButton aria-label="view" onClick={() => handleViewPoll(id)}>
                        <ViewIcon fontSize="small" />
                    </IconButton>
                ])
            },
        },
    ];

    const rows = polls.map(poll => ({
        id: poll.id,
        title: poll.name,
        email: poll.user?.email,
        company: poll.company?.name,
        created: poll.created,
        modified: poll.modified,
        status: resolveFormStatusLabel(poll.status),
        actions: poll,
    }));

    return (
        <>
            <Container component="main" className={classes.container}>
                <Typography variant="h5" align="left" className={classes.title}>Cuestionarios</Typography>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        loading={loading}
                        components={{
                            noRowsOverlay: CustomNoRowsOverlay,
                        }}
                    />
                </div>
            </Container>
        </>
    )
};