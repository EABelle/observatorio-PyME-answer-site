import config from "./config";
import Axios from "axios";

const axios = Axios.create({
    baseURL: config.baseURL,
});

async function login(userName, password) {
    const response = await axios.post('/login', { userName, password });
    return response.data;
}

export default { login };