import { STATUS } from "../../constants";

export const completeForms = [{
    id: '123',
    name: 'Formulario 1',
    status: STATUS.COMPLETE,
    questions: [
        {
            type: 'TEXT',
            title: 'Titulo',
            value: 'Esta es una respuesta de texto',
            mandatory: true,
        },
        {
            type: 'CHOICE',
            title: 'Titulo',
            options: [
                'Opcion 1',
                'Opcion 2'
            ],
            value: 1
        },
        {
            type: 'GROUPED_CHOICE',
            title: 'Titulo',
            groups: [
                {
                    title: 'Grupo 1',
                    value: 2,
                    mandatory: true,
                },
                {
                    title: 'Grupo 2',
                    value: 1
                },
            ],
            options: [
                'Opcion 1',
                'Opcion 2'
            ],
        },
        {
            type: 'NUMBER',
            title: 'Titulo',
            value: 45,
            restrictions: {
                min: 1,
                max: null
            },
            mandatory: true
        },
    ],
}];

export const inProgressForms = [];

export const notStartedForms = [];