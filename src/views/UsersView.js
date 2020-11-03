
import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
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
    const [ users, setUsers ] = useState([]);
    const [ roles, setRoles ] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [filter, setFilter] = useState({});
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
            const {data: usersResponse} = await UserService.getUsers(filter);
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
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'name', headerName: 'Nombre', width: 200 },
        { field: 'email', headerName: 'email', width: 200 },
        { field: 'company', headerName: 'Empresa',  width: 200 },
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 200,
            renderCell: (params) => {
                const user = params.value;
                return ([
                    <IconButton aria-label="view" onClick={() => handleViewModal(user)}>
                        <ViewIcon fontSize="small" />
                    </IconButton>,
                    <IconButton aria-label="edit" onClick={() => handleEditModal(user)}>
                        <EditIcon fontSize="small" />
                    </IconButton>,
                    <IconButton aria-label="delete" onClick={() => handleDelete(user.id)}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>,
                ])
            },
        },
    ];

    const rows = users.map(user => ({
        company: user.company?.name,
        email: user.email,
        id: user.id,
        name: user.name,
        actions: user,
    }));

    return (
        <>
            <Container component="main" className={classes.container}>
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
                            noRowsOverlay: CustomNoRowsOverlay,
                        }}
                    />
                </div>
            </Container>
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