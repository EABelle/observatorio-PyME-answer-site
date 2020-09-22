import config from "./config";
import Cookies from 'universal-cookie';
import {pymeDetails} from "./__mocks__/pyme";
// import Axios from "axios"; TODO
const Axios = {
    create: () => ({
        get: () => Promise.resolve({
            data: pymeDetails,
        })
    }),
};
const cookies = new Cookies();

const axios = Axios.create({
    baseURL: config.baseURL,
});


function getPymeDetailsById(id) {
    return axios.get(`/pyme/${id}`, {
        headers: {
            Authorization: cookies.get('py_auth_token')
        }
    });
}

export default { getPymeDetailsById };