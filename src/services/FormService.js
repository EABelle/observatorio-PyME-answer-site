import FormClient from "../api/FormClient";

export const getMyFormsByStatus = (status, page = 0, size = 10) => (
    FormClient.getMyForms({
        status,
        page,
        size
    })
);

const FormService = {
    getMyFormsByStatus,
};

export default FormService;