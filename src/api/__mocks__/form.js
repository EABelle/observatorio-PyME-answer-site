import {QUESTION_TYPE, STATUS} from "../../constants";

export const completeForms = [
    {
        id: '1',
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
    },
    {
        id: '2',
        name: 'Formulario 2',
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
                type: 'GROUPED',
                title: 'Titulo',
                description: 'Describa las ventas acumuladas en cada año',
                questions: [
                    {
                        type: QUESTION_TYPE.CHOICE,
                        title: '2019',
                        options: [ 'Vendió', 'No vendió' ],
                        mandatory: true,
                        value: null
                    },
                    {
                        type: QUESTION_TYPE.NUMBER,
                        title: '2019',
                        mandatory: false,
                        value: null
                    },
                    {
                        type: QUESTION_TYPE.CHOICE,
                        title: '2019',
                        options: [ 'Vendió', 'No vendió' ],
                        mandatory: true,
                        value: null
                    },
                    {
                        type: QUESTION_TYPE.NUMBER,
                        title: '2020',
                        mandatory: false,
                        value: null
                    },
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
    },
];

export const inProgressForms = [
    {
        id: '3',
        name: 'Formulario 3',
        status: STATUS.IN_PROGRESS,
        questions: [
            {
                type: QUESTION_TYPE.FILE,
                title: 'Archivo 1',
                value: null,
                mandatory: true,
            },
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
    },
];

export const notStartedForms = [];