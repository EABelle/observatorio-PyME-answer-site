import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import {CustomNoRowsOverlay} from "../components/NoRowsOverlay";
import IconButton from '@material-ui/core/IconButton';
import ViewIcon from '@material-ui/icons/Visibility';
import FormService from "../services/FormService";
import {resolveFormStatusLabel} from "../utils";
import PageContainer from "../components/PageContainer";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles(theme => ({
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


export default function PollsAdminView() {

    const classes = useStyles();
    const history = useHistory();
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

    const handleViewPoll = (id) => {
        history.push(`/cuestionario/${id}`);
    };

    const columns = [
        { field: 'title', headerName: 'Título', width: 200 },
        { field: 'email', headerName: 'email usuario', width: 200 },
        { field: 'company', headerName: 'Empresa',  width: 200 },
        { field: 'status', headerName: 'Estado',  width: 200 },
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 200,
            renderCell: (params) => {
                const id = params.value.id;
                return (
                    <IconButton key={'view_' + id} aria-label="view" onClick={() => handleViewPoll(id)}>
                        <ViewIcon fontSize="small" />
                    </IconButton>
                )
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
        <PageContainer>
            <Typography variant="h5" align="left" className={classes.title}>Cuestionarios</Typography>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    disableExtendRowFullWidth={true}
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    loading={loading}
                    components={{
                        noRowsOverlay: CustomNoRowsOverlay,
                    }}
                />
            </div>
        </PageContainer>
    )
};