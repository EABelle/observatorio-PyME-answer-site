import config from "./config";

// TODO: Request to backend
// import Axios from "axios";
const Axios = {
    create: () => ({
        post: (path, { userName, password }) => {
            if (userName === 'test' && password === 'test')
                return 'MockedToken';
            const error = new Error('Not authorized');
            error.response.status = 401;
            return error;
        },  // mocked method
    }),
};
//--------------------------------------------------

const axios = Axios.create({
    baseURL: config.baseURL,
});

async function login(userName, password) {
    const response = await axios.post('/login', { userName, password });
    return response.data;
}

export default { login };