import { STATUS } from "../constants";
// import Axios from "axios";
import config from "./config";
import { completeForms, inProgressForms, notStartedForms } from "./__mocks__/form";

const mockedGetMyForms = ({ status, page }) => {
    if (status === STATUS.COMPLETE) {
        return {data: completeForms, page, totalPages: 1};
    }
    if (status === STATUS.IN_PROGRESS) {
        return {data: inProgressForms, page, totalPages: 1};
    }
    if (status === STATUS.NOT_STARTED) {
        return {data: notStartedForms, page, totalPages: 1};
    }
    return {data: [...completeForms, ...inProgressForms, ...notStartedForms], page, totalPages: 1}
};

const Axios = {
    create: () => ({
        get: (path, config) => {
            if (path === '/myForms')
                return mockedGetMyForms(config);
        }
    }),
};
//--------------------------------------------------

const axios = Axios.create({
    baseURL: config.baseURL,
});

export const getMyForms = async ({ status, page, size }) => {
    const response = await axios.get('/myForms', {
        status,
        page: page || 0,
        size: size || 10
    });
    return response;
};

const FormClient = {
    getMyForms,
};

export default FormClient;