import FormClient from "../api/FormClient";

export const getMyFormsByStatus = (status) => (
    FormClient.getMyFormsByStatus(status)
);

export const getFormById = (id) => (
    FormClient.getFormById(id)
);

export const getForms = (filter) => (
    FormClient.getForms(filter)
);

export const getTemplates = (filter) => (
    FormClient.getTemplates(filter)
);

export const createPollsFromTemplate = (templateId) => (
    FormClient.createPollsFromTemplate(templateId)
);

export const saveForm = (form) => (
    FormClient.saveForm(form)
);

export const sendForm = async (form) => {
    const saveFormResponse = await saveForm(form);
    return FormClient.closeForm(saveFormResponse.data.id);
};

export const askForHelp = async (questionId) =>
    FormClient.saveHelpRequest(questionId);

const FormService = {
    getMyFormsByStatus,
    getFormById,
    getForms,
    getTemplates,
    createPollsFromTemplate,
    saveForm,
    sendForm,
    askForHelp,
};

export default FormService;