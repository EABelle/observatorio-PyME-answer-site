import {STATUS} from "./constants";

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