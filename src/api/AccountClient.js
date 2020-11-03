import config from "./config";
import Cookies from 'universal-cookie';
import Axios from "axios";

const cookies = new Cookies();

const axios = Axios.create({
    baseURL: config.baseURL,
});


async function getMyAccount() {
    const response = await axios.get('/myAccount', {
        headers: {
            Authorization: cookies.get('py_auth_token')
        }
    });
    return response.data;
}

function getUsers(filter) {
    return axios.get('/users', {
        headers: {
            Authorization: cookies.get('py_auth_token')
        },
        params: filter,
    });
}

async function getUserById(id) {
    const response = await axios.get(`/users/${id}`, {
        headers: {
            Authorization: cookies.get('py_auth_token')
        }
    });
    return response.data;
}

async function createUser(user) {
    const response = await axios.post('/users', user, {
        headers: {
            Authorization: cookies.get('py_auth_token')
        }
    });
    return response.data;
}

async function inviteUser(user) {
    const response = await axios.post('/inviteUser', user, {
        headers: {
            Authorization: cookies.get('py_auth_token')
        }
    });
    return response.data;
}

async function confirmUser(id, password) {
    const response = await axios.patch(`/users/${id}/confirm`, { password }, {
        headers: {
            Authorization: cookies.get('py_auth_token')
        }
    });
    return response.data;
}

async function editUser(user) {
    const { id, ...payload } = user;
    const response = await axios.put(`/users/${id}`, payload, {
        headers: {
            Authorization: cookies.get('py_auth_token')
        }
    });
    return response.data;
}
async function deleteUser(id) {
    const response = await axios.delete(`/users/${id}`, {
        headers: {
            Authorization: cookies.get('py_auth_token')
        }
    });
    return response.data;
}

function getRoles(filter) {
    return axios.get('/roles', {
        headers: {
            Authorization: cookies.get('py_auth_token')
        },
        params: filter,
    });
}

async function getRoleById(id) {
    const response = await axios.get(`/roles/${id}`, {
        headers: {
            Authorization: cookies.get('py_auth_token')
        }
    });
    return response.data;
}

async function createRole(role) {
    const response = await axios.post('/roles', role, {
        headers: {
            Authorization: cookies.get('py_auth_token')
        }
    });
    return response.data;
}
async function editRole(role) {
    const { id, ...payload } = role;
    const response = await axios.put(`/roles/${id}`, payload, {
        headers: {
            Authorization: cookies.get('py_auth_token')
        }
    });
    return response.data;
}
async function deleteRole(id) {
    const response = await axios.delete(`/roles/${id}`, {
        headers: {
            Authorization: cookies.get('py_auth_token')
        }
    });
    return response.data;
}

export default {
    getMyAccount,
    getUsers,
    getUserById,
    createUser,
    confirmUser,
    inviteUser,
    editUser,
    deleteUser,
    getRoles,
    getRoleById,
    createRole,
    editRole,
    deleteRole
};