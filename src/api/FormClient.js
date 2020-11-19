import { STATUS } from "../constants";
import Cookies from 'universal-cookie';
import Axios from "axios";
import config from "./config";
const cookies = new Cookies();

const axios = Axios.create({
    baseURL: config.baseURL,
    headers: {
        Authorization: cookies.get('py_auth_token')
    }
});

export const getMyFormsByStatus = (status) => {
    return axios.get('/myForms', {
        params: {
            status
        },
    });
};

export const getFormById = (id) => {
    return axios.get(`/polls/${id}`);
};

export const getTemplateById = (id) => {
    return axios.get(`/templates/${id}`);
};

export const getPolledUsers = (templateId) => {
    return axios.get(`/templates/${templateId}/users`);
}

export const getForms = (filter) => {
    return axios.get(`/polls`, {
        params: filter
    });
};

export const getTemplates = (filter) => {
    return axios.get(`/templates`, {
        params: filter
    });
};

export const saveForm = (form) => {
    return axios.put(`/polls/${form.id}`, form);
};

export const uploadFiles = (formId, files) => {
    return axios.post(`/polls/${formId}/files`, files);
};

export const createPollsFromTemplate = (templateId, userIds) => {
    return axios.post(`/polls/fromTemplate`, {templateId, userIds});
};

export const closeForm = (id) => {
    return axios.patch(`/polls/${id}`, {
        status: STATUS.COMPLETE
    });
};

export const saveHelpRequest = (question) => {
    return axios.post(`/help`, { question });
};

const FormClient = {
    getMyFormsByStatus,
    getFormById,
    getForms,
    getTemplates,
    getTemplateById,
    getPolledUsers,
    createPollsFromTemplate,
    saveForm,
    closeForm,
    saveHelpRequest,
    uploadFiles,
};

export default FormClient;