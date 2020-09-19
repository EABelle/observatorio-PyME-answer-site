import { STATUS } from "../constants";
// import Axios from "axios";
import config from "./config";
import { completeForms, inProgressForms, notStartedForms } from "./__mocks__/form";

const mockedGetMyForms = (status) => {
    console.log(status)
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
        }
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

const FormClient = {
    getMyFormsByStatus,
};

export default FormClient;