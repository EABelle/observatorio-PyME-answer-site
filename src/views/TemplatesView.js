import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import {CustomNoRowsOverlay} from "../components/NoRowsOverlay";
import IconButton from '@material-ui/core/IconButton';
import ViewIcon from '@material-ui/icons/Visibility';
import SendIcon from '@material-ui/icons/Send';
import FormService from "../services/FormService";
import {number} from "prop-types";
import PageContainer from "../components/PageContainer";

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


export default () => {

    const classes = useStyles();

    const [ templates, setTemplates ] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [filter, setFilter] = useState({});
    const [hasFetched, setHasFetched] = useState(false);

    const fetchMyForms = () => {
        if(hasFetched) {
            return;
        }
        setError(false);
        setLoading(true);
        FormService.getTemplates(filter)
            .then(({data}) => {
                setLoading(false);
                setTemplates(data);
                setHasFetched(true);
            })
            .catch(() => {
                setLoading(false);
                setError(true);
                setHasFetched(true);
            });
    };

    useEffect(() => {
        fetchMyForms();
    }, [hasFetched]);

    const handleViewTemplate = (template) => {};
    const handleMassiveSend = (templateId) => {
        setError(false);
        setLoading(true);
        FormService.createPollsFromTemplate(templateId)
            .then(() => {
                setLoading(false);
                setHasFetched(false);
            })
            .catch(() => {
                setLoading(false);
                setError(true);
            });
    };

    const columns = [
        { field: 'title', headerName: 'Título', width: 200 },
        { field: 'created', headerName: 'Creada',  width: 200 },
        { field: 'sentCount', headerName: 'Envíos',  width: 200, type: number },
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 200,
            renderCell: (params) => {
                const template = params.value;
                return ([
                    <IconButton aria-label="view" onClick={() => handleViewTemplate(template)}>
                        <ViewIcon fontSize="small" />
                    </IconButton>,
                    <IconButton aria-label="view" onClick={() => handleMassiveSend(template.id)}>
                        <SendIcon fontSize="small" />
                    </IconButton>
                ])
            },
        },
    ];

    const rows = templates.map(template => ({
        title: template.name,
        created: template.created,
        sentCount: template.sentCount,
        actions: template,
    }));

    return (
        <PageContainer>
            <Typography variant="h5" align="left" className={classes.title}>Plantillas</Typography>
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
        </PageContainer>
    )
};