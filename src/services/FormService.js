import FormClient from "../api/FormClient";
import { flatten } from "lodash";
import {QUESTION_TYPE} from "../constants";

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

export const getTemplateById = (id) => (
    FormClient.getTemplateById(id)
);

export const getPolledUsers = (templateId) => (
    FormClient.getPolledUsers(templateId)
);

export const createPollsFromTemplate = (templateId, userIds) => (
    FormClient.createPollsFromTemplate(templateId, userIds)
);

export const uploadFiles = async (form) => {
    let questions = flatten(form.sections.map(s => s.questions));
    const innerQuestions = flatten(questions
        .filter(q => q.type === QUESTION_TYPE.GROUPED)
        .map(q => q.questions));
    questions = [...questions.filter(q => q.type !== QUESTION_TYPE.GROUPED), ...innerQuestions];
    const fileLists = questions
        .filter(q => q.type === QUESTION_TYPE.FILE)
        .map(q => q.value);
    const files = new FormData();
    fileLists.forEach(fileList => {
        for (let i = 0; i < fileList.length; i++) {
            const file = fileList.item(i);
            files.append(`${form.id}_${i}`, file, file.name);
        }
    })
    if(fileLists.length) {
        await FormClient.uploadFiles(form.id, files);
    }
};

export const saveForm = async (form) => {
    await uploadFiles(form);
    return await FormClient.saveForm(form)
};

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
    getTemplateById,
    getPolledUsers,
    createPollsFromTemplate,
    saveForm,
    sendForm,
    askForHelp,
};

export default FormService;