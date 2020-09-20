import FormClient from "../api/FormClient";

export const getMyFormsByStatus = (status) => (
    FormClient.getMyFormsByStatus(status)
);

export const getFormById = (id) => (
    FormClient.getFormById(id)
);

export const saveForm = (form) => (
    FormClient.saveForm(form)
);

export const sendForm = async (form) => {
    const saveFormResponse = await saveForm(form);
    return FormClient.closeForm(saveFormResponse.data.id);
};

const FormService = {
    getMyFormsByStatus,
    getFormById,
    saveForm,
    sendForm,
};

export default FormService;