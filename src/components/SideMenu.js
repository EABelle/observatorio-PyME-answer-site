import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PollIcon from '@material-ui/icons/Poll';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {getUserFromToken} from "../utils";
import {useHistory} from "react-router-dom";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles({
    list: {
        width: 250,
    }
});

const options = [
    {
        path: '/misCuestionarios',
        permission: 'ANSWER',
        name: 'Mis Cuestionarios',
        icon: <AssignmentIcon />
    },
    {
        path: '/usuarios',
        permission: 'MANAGE_USERS',
        name: 'Usuarios',
        icon: <PersonIcon />
    },
    {
        path: '/roles',
        permission: 'MANAGE_USERS',
        name: 'Roles',
        icon: <GroupIcon />
    },
    {
        path: '/cuestionarios',
        permission: 'MANAGE_POLLS',
        name: 'Cuestionarios',
        icon: <PollIcon />
    },
    {
        path: '/plantillas',
        permission: 'MANAGE_POLLS',
        name: 'Plantillas',
        icon: <FileCopyIcon />
    },
];

export default function SideMenu({isOpen, setIsOpen, account, onLogout}) {
    const classes = useStyles();
    const history = useHistory();
    const userPermissions = getUserFromToken().permissions;

    const list = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={() => setIsOpen( false)}
        >
            <div className={classes.userContainer}>
                <Typography variant="subtitle1">{account?.name}</Typography>
                <Typography variant="caption" className={classes.logout} onClick={onLogout}>Cerrar Sesión</Typography>
            </div>
            <List>
                {options
                    .filter(option => (userPermissions.includes(option.permission)))
                    .map((option) => (
                    <ListItem button key={option.permission} onClick={() => history.push(option.path)}>
                        <ListItemIcon>{option.icon}</ListItemIcon>
                        <ListItemText primary={option.name} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <SwipeableDrawer
                anchor="left"
                open={isOpen}
                onClose={() => {setIsOpen(false)}}
                onOpen={() => {setIsOpen(true)}}
            >
                {list()}
            </SwipeableDrawer>
        </div>
    );
}