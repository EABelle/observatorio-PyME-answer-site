import { STATUS } from "../constants";
// import Axios from "axios";
import config from "./config";
import { completeForms, inProgressForms, notStartedForms } from "./__mocks__/form";

const mockedGetMyForms = (status) => {

    if (status === STATUS.COMPLETE) {
        return {data: completeForms};
    }
    if (status === STATUS.IN_PROGRESS) {
        return {data: inProgressForms};
    }
    if (status === STATUS.NOT_STARTED) {
        return {data: notStartedForms};
    }
    return {data: [...completeForms, ...inProgressForms, ...notStartedForms]}
};

const Axios = {
    create: () => ({
        get: (path, config) => {
            if (path === '/myForms')
                return Promise.resolve(mockedGetMyForms(config.query?.status));
            if (path === '/forms') {
                return Promise.resolve({data: mockedGetMyForms().data.find(({id}) => id === config.params?.id)});
            }
        },
        put: (path, form) => {
            if (path.startsWith('/forms')) {
                return Promise.resolve({data: form});
            }
        },
        patch: (path, formId) => {
            if (path.startsWith('/forms')) {
                return Promise.resolve({
                    data: {
                        ...mockedGetMyForms().data.find(({id}) => id === formId),
                        status: STATUS.COMPLETE,
                    }
                });
            }
        },
        post: (path) => {
            if (path.startsWith('/questions')) {
                return Promise.resolve({
                    data: { questionId: path.split('/').pop() }
                });
            }
        },
    }),
};
//--------------------------------------------------

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