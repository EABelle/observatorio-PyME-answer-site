import {STATUS} from "./constants";
import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken';

const cookies = new Cookies();

export const resolveFormStatusLabel = (status) => {
    return (
        status === STATUS.COMPLETE ? 'Completados'
            : status === STATUS.IN_PROGRESS ? 'En progreso'
            : 'Sin iniciar'
    );
};

export function getColorFromLabel(status) {
    return status === STATUS.COMPLETE ? 'green' :
        status === STATUS.IN_PROGRESS ? 'orange' : 'red';
}

export const getUserFromToken = () => {
    const token = cookies.get('py_auth_token');
    try {
        const decoded = jwt.verify(token, process.env.SECRET || 'oOo4GxNMMsw9OBTUMFq7oA');
        console.log(decoded);
        return decoded;
    } catch(err) {
        console.log(err);
    }
}