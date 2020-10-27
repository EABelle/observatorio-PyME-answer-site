import { STATUS } from "../constants";
import Axios from "axios";
import config from "./config";

const axios = Axios.create({
    baseURL: config.baseURL,
});

export const getMyFormsByStatus = (status) => {
    return axios.get('/myForms', {
        query: {
            status
        },
    });
};

export const getFormById = (id) => {
    return axios.get('/forms', {
        params: {
            id
        },
    });
};

export const saveForm = (form) => {
    return axios.put(`/forms/${form.id}`, form);
};

export const closeForm = (id) => {
    return axios.patch(`/forms/${id}`, {
        status: STATUS.COMPLETE
    });
};

export const saveHelpRequest = (questionId) => {
    return axios.post(`/questions/${questionId}`);
};

const FormClient = {
    getMyFormsByStatus,
    getFormById,
    saveForm,
    closeForm,
    saveHelpRequest,
};

export default FormClient;