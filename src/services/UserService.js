import AccountClient from "../api/AccountClient";

export const getUsers = (filter) => (
    AccountClient.getUsers(filter)
);

export const getUserById = (id) => (
    AccountClient.getUserById(id)
);

export const createUser = (user) => (
    AccountClient.createUser(user)
);

export const editUser = (user) => (
    AccountClient.editUser(user)
);

export const deleteUser = (id) => (
    AccountClient.deleteUser(id)
);

export const getRoles = (filter = {}) => (
    AccountClient.getRoles(filter)
);

export const getRoleById = (id) => (
    AccountClient.getRoleById(id)
);

export const createRole = (role) => (
    AccountClient.createRole(role)
);

export const editRole = (role) => (
    AccountClient.editRole(role)
);

export const deleteRole = (id) => (
    AccountClient.deleteRole(id)
);

const UserService = {
    getUsers,
    getUserById,
    createUser,
    editUser,
    deleteUser,
    getRoles,
    getRoleById,
    createRole,
    editRole,
    deleteRole,
};

export default UserService;