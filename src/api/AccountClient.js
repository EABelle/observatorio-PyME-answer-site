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

export default { getMyAccount };