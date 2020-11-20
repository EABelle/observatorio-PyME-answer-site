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
import ResponsiveDialog from "../components/ResponsiveDialog";
import AddIcon from "@material-ui/icons/Add";
import {CRUD_ACTION} from "../constants";
import Button from '@material-ui/core/Button';
import PageContainer from "../components/PageContainer";
import {ErrorOverlay} from "../components/ErrorOverlay";

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


export default function UsersView() {

    const classes = useStyles();
    const [ users, setUsers ] = useState([]);
    const [ roles, setRoles ] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [modalAction, setModalAction] = useState('');

    const fetch = async () => {
        if(hasFetched) {
            return;
        }
        setError(false);
        setLoading(true);
        try {
            const {data: usersResponse} = await UserService.getUsers();
            const {data: rolesResponse} = await UserService.getRoles();
            setLoading(false);
            setUsers(usersResponse);
            setRoles(rolesResponse.map(({ name }) => name));
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

    const handleEditModal = user => {
        setSelectedUser(user);
        setModalAction(CRUD_ACTION.UPDATE);
        setOpenDialog(true);
    };

    const handleCreateModal = user => {
        setSelectedUser(user);
        setModalAction(CRUD_ACTION.CREATE);
        setOpenDialog(true);
    };

    const handleViewModal = user => {
        setSelectedUser(user);
        setModalAction(CRUD_ACTION.READ);
        setOpenDialog(true);
    };

    const handleCloseModal = () => {
        setSelectedUser({});
        setModalAction('');
        setOpenDialog(false);
    };

    const handleDelete = userId => {
        setLoading(true);
        UserService.deleteUser(userId)
            .then(() => {
                setLoading(false);
                setHasFetched(false);
            })
            .catch(() => {
                setLoading(false);
                setError(true);
            })
    };

    const handleCreateUser = user => {
        setLoading(true);
        UserService.inviteUser(user)
            .then(() => {
                setLoading(false);
                setHasFetched(false);
            })
            .catch(() => {
                setLoading(false);
                setError(true);
            })
    };

    const handleEditUser = user => {
        setLoading(true);
        UserService.editUser(user)
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
        { field: 'email', headerName: 'email', width: 200 },
        { field: 'company', headerName: 'Empresa',  width: 200 },
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 200,
            renderCell: (params) => {
                const user = params.value;
                return (
                    <div key={user.id}>
                        <IconButton aria-label="view" onClick={() => handleViewModal(user)}>
                            <ViewIcon fontSize="small" />
                        </IconButton>
                        <IconButton aria-label="edit" onClick={() => handleEditModal(user)}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={() => handleDelete(user.id)}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </div>
                )
            },
        },
    ];

    const rows = users.map(user => ({
        company: user.company?.name,
        email: user.email,
        name: user.name,
        actions: user,
    }));

    return (
        <>
            <PageContainer>
                <div className={classes.head}>
                    <Typography variant="h5" align="left" className={classes.title}>Usuarios</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleCreateModal}
                        startIcon={<AddIcon />}
                    > Agregar usuario </Button>

                </div>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        loading={loading}
                        components={{
                            noRowsOverlay: error ? ErrorOverlay : CustomNoRowsOverlay,
                        }}
                    />
                </div>
            </PageContainer>
            <ResponsiveDialog
                action={modalAction}
                open={openDialog}
                user={selectedUser}
                allRoles={roles}
                onClose={handleCloseModal}
                onConfirm={modalAction === CRUD_ACTION.CREATE ? handleCreateUser : handleEditUser}
            />
        </>
    )
};