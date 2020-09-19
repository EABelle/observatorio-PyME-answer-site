import FormClient from "../api/FormClient";

export const getMyFormsByStatus = (status) => (
    FormClient.getMyFormsByStatus(status)
);

const FormService = {
    getMyFormsByStatus,
};

export default FormService;