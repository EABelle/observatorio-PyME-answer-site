const environment = process.env.NODE_ENV || 'development';
const config = {
    development: {
        baseURL: process.env.REACT_APP_CLIENT_BASE_URL || 'http://localhost:8080/',
    },
    test: {
        baseURL: process.env.REACT_APP_CLIENT_BASE_URL || 'http://localhost:8080/',
    },
    staging: {
        baseURL: process.env.REACT_APP_CLIENT_BASE_URL || 'http://localhost:8080/',
    },
    production: {
        baseURL: process.env.REACT_APP_CLIENT_BASE_URL || 'https://observatorio-pyme-answer-back.herokuapp.com/',
    },
};
export default config[environment];