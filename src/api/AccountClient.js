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
async function editUser(user) {
    const response = await axios.put('/myAccount', user, {
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

export default {
    getMyAccount,
    getUsers,
    getUserById,
    createUser,
    editUser,
    deleteUser
};