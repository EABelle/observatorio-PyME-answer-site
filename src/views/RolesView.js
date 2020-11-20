import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import UserService from "../services/UserService";
import { DataGrid } from '@material-ui/data-grid';
import {CustomNoRowsOverlay} from "../components/NoRowsOverlay";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ViewIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import ResponsiveRolesDialog from "../components/ResponsiveRolesDialog";
import AddIcon from "@material-ui/icons/Add";
import {CRUD_ACTION} from "../constants";
import Button from '@material-ui/core/Button';
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


export default function RolesView() {

    const classes = useStyles();
    const [ roles, setRoles ] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRole, setSelectedRole] = useState({});
    const [modalAction, setModalAction] = useState('');

    const fetch = async () => {
        if(hasFetched) {
            return;
        }
        setError(false);
        setLoading(true);
        try {
            const {data: rolesResponse} = await UserService.getRoles();
            setLoading(false);
            setRoles(rolesResponse);
            setHasFetched(true);
        } catch(e) {
            setLoading(false);
            setError(true);
            setHasFetched(true);
        }
    };

    useEffect(() => {
        fetch();
    },[hasFetched]);

    const handleEditModal = role => {
        setSelectedRole(role);
        setModalAction(CRUD_ACTION.UPDATE);
        setOpenDialog(true);
    };

    const handleCreateModal = role => {
        setSelectedRole(role);
        setModalAction(CRUD_ACTION.CREATE);
        setOpenDialog(true);
    };

    const handleViewModal = role => {
        setSelectedRole(role);
        setModalAction(CRUD_ACTION.READ);
        setOpenDialog(true);
    };

    const handleCloseModal = () => {
        setSelectedRole({});
        setModalAction('');
        setOpenDialog(false);
    };

    const handleDelete = roleId => {
        setLoading(true);
        UserService.deleteRole(roleId)
            .then(() => {
                setLoading(false);
                setHasFetched(false);
            })
            .catch(() => {
                setLoading(false);
                setError(true);
            })
    };

    const handleCreateRole = role => {
        setLoading(true);
        UserService.createRole(role)
            .then(() => {
                setLoading(false);
                setHasFetched(false);
            })
            .catch(() => {
                setLoading(false);
                setError(true);
            })
    };

    const handleEditRole = role => {
        setLoading(true);
        UserService.editRole(role)
            .then(() => {
                setLoading(false);
                setHasFetched(false);
            })
            .catch(() => {
                setLoading(false);
                setError(true);
            })
    };

    const columns = [
        { field: 'name', headerName: 'Nombre', width: 200 },
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 200,
            renderCell: (params) => {
                const role = params.value;
                return ([
                    <IconButton aria-label="view" onClick={() => handleViewModal(role)}>
                        <ViewIcon fontSize="small" />
                    </IconButton>,
                    <IconButton aria-label="edit" onClick={() => handleEditModal(role)}>
                        <EditIcon fontSize="small" />
                    </IconButton>,
                    <IconButton aria-label="delete" onClick={() => handleDelete(role.id)}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>,
                ])
            },
        },
    ];

    const rows = roles.map(role => ({
        name: role.name,
        actions: role,
    }));

    return (
        <>
            <PageContainer>
                <div className={classes.head}>
                    <Typography variant="h5" align="left" className={classes.title}>Roles</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleCreateModal}
                        startIcon={<AddIcon />}
                    > Agregar rol </Button>

                </div>
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
            <ResponsiveRolesDialog
                action={modalAction}
                open={openDialog}
                role={selectedRole}
                onClose={handleCloseModal}
                onConfirm={modalAction === CRUD_ACTION.CREATE ? handleCreateRole : handleEditRole}
            />
        </>
    )
};