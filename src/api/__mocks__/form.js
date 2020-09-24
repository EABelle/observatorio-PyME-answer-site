import {QUESTION_TYPE, STATUS} from "../../constants";

export const completeForms = [
    {
        id: '1',
        name: 'Formulario 1',
        userId: 'abc',
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
        userId: 'abc',
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
        userId: 'abc',
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
                type: 'SELECT',
                title: 'Select',
                options: [
                    'Opcion 1',
                    'Opcion 2'
                ],
                value: 1
            },
            {
                type: 'TEXT',
                title: 'Importe en pesos',
                value: '',
                mandatory: true,
                adornment: '$',
                isCurrency: true,
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
                type: QUESTION_TYPE.MULTIPLE_CHOICE,
                title: 'Titulo',
                options: [
                    'Opcion 1',
                    'Opcion 2'
                ],
                value: []
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

export const notStartedForms = [
    {
        id: '4',
        userId: 'abcd',
        name: 'Cuestionario sobre la empresa',
        status: STATUS.NOT_STARTED,
        sections: [{
            title: 'Sección 1',
            questions: [
                {
                    type: 'SELECT',
                    title: 'Actividad principal',
                    value: '',
                    options: [
                        "Comercialización al exterior",
                        "Fábrica",
                        "Construcción",
                    ],
                    mandatory: true,
                },
                {
                    type: 'CHOICE',
                    title: 'Realizó inversiones durante 2019?',
                    value: '',
                    options: [
                        "Sí",
                        "No",
                    ],
                    mandatory: true,
                },
                {
                    type: QUESTION_TYPE.FILE,
                    title: 'Archivo 1',
                    value: '',
                    mandatory: true,
                },
                {
                    type: 'TEXT',
                    title: 'Titulo',
                    value: 'Esta es una respuesta de texto',
                    mandatory: true,
                },
                {
                    type: 'SELECT',
                    title: 'Select',
                    options: [
                        'Opcion 1',
                        'Opcion 2'
                    ],
                    value: 1
                },
                {
                    type: 'TEXT',
                    title: 'Importe en pesos',
                    value: '',
                    mandatory: true,
                    adornment: '$',
                    isCurrency: true,
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
                    type: QUESTION_TYPE.MULTIPLE_CHOICE,
                    title: 'Titulo',
                    options: [
                        'Opcion 1',
                        'Opcion 2'
                    ],
                    value: []
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
                title: 'Sección 2',
                questions: [
                    {
                        type: 'SELECT',
                        title: 'Actividad principal',
                        value: '',
                        options: [
                            "Comercialización al exterior",
                            "Fábrica",
                            "Construcción",
                        ],
                        mandatory: true,
                    },
                    {
                        type: 'CHOICE',
                        title: 'Realizó inversiones durante 2019?',
                        value: '',
                        options: [
                            "Sí",
                            "No",
                        ],
                        mandatory: true,
                    },
                    {
                        type: QUESTION_TYPE.FILE,
                        title: 'Archivo 1',
                        value: '',
                        mandatory: true,
                    },
                    {
                        type: 'TEXT',
                        title: 'Titulo',
                        value: 'Esta es una respuesta de texto multilínea',
                        multiline: true,
                        mandatory: true,
                    },
                    {
                        type: 'SELECT',
                        title: 'Select',
                        options: [
                            'Opcion 1',
                            'Opcion 2'
                        ],
                        value: 1
                    },
                    {
                        type: 'TEXT',
                        title: 'Importe en pesos',
                        value: '',
                        mandatory: true,
                        adornment: '$',
                        isCurrency: true,
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
                        type: QUESTION_TYPE.MULTIPLE_CHOICE,
                        title: 'Titulo',
                        options: [
                            'Opcion 1',
                            'Opcion 2'
                        ],
                        value: []
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
            }
        ]
    },
];