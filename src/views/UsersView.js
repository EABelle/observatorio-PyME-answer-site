
import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import UserService from "../services/UserService";
import { DataGrid } from '@material-ui/data-grid';

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: 24,
        [theme.breakpoints.up('lg')]: {
            marginTop: 24
        }
    },
    mapContainer: {
        width: '50%'
    },
    title: {
        marginBottom: 24
    }
}));

const columns = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'name', headerName: 'Nombre', width: 200 },
    { field: 'email', headerName: 'email', width: 200 },
    {
        field: 'company',
        headerName: 'Empresa',
        width: 200,
    },
];

export default () => {

    const classes = useStyles();
    const [ users, setUsers ] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [filter, setFilter] = useState({});
    const [hasFetched, setHasFetched] = useState(false);

    const fetchUsers = () => {
        if(hasFetched) {
            return;
        }
        setError(false);
        setLoading(true);
        UserService.getUsers(filter)
            .then(({data}) => {
                setLoading(false);
                setUsers(data);
                setHasFetched(true);
                console.log(data)
            })
            .catch(() => {
                setLoading(false);
                setError(true);
                setHasFetched(true);
            });
    };

    useEffect(() => {
        fetchUsers();
    },[hasFetched]);

    const rows = users.map(user => ({
        company: user.company?.name,
        email: user.email,
        id: user.id,
        name: user.name
    }));

    return (
        <Container component="main" className={classes.container}>
            <Typography variant="h5" align="left" className={classes.title}>Usuarios</Typography>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
            </div>
        </Container>
    )
};