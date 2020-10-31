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

const UserService = {
    getUsers,
    getUserById,
    createUser,
    editUser,
    deleteUser,
};

export default UserService;