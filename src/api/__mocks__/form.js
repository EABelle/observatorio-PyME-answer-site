import {QUESTION_TYPE, STATUS} from "../../constants";

export const completeForms = [
    {
        id: '5',
        userId: 'abcd',
        name: 'Cuestionario sobre la empresa',
        description: 'Este es un cuestinonario sobre la empresa',
        status: STATUS.COMPLETE,
        sections: [{
            title: 'Datos de Identificación de la Empresa',
            description: 'Ingresá todos los datos',
            questions: [
                {
                    type: 'TEXT',
                    title: 'Nombre o razón social de la empresa',
                    value: 'Empresa Textil SRL',
                    mandatory: true,
                },
                {
                    type: 'TEXT',
                    title: 'CUIT',
                    value: '20948372901',
                    mandatory: true,
                },
                {
                    type: 'TEXT',
                    title: 'Domicilio',
                    value: 'Av. Belgrano 123',
                    mandatory: true,
                },
                {
                    type: 'TEXT',
                    title: 'CP',
                    value: '1234',
                    mandatory: true,
                },
                {
                    type: 'TEXT',
                    title: 'Localidad',
                    value: 'CABA',
                    mandatory: true,
                },
                {
                    type: 'TEXT',
                    title: 'Partido / departamento',
                    value: 'CABA',
                    mandatory: true,
                },
                {
                    type: 'TEXT',
                    title: 'Provincia',
                    value: 'CABA',
                    mandatory: true,
                },
                {
                    type: 'TEXT',
                    title: 'Teléfono',
                    value: '15123456',
                    mandatory: true,
                },
                {
                    type: 'TEXT',
                    title: 'email',
                    value: 'contacto@empresatextil.com',
                    mandatory: true,
                },
                {
                    type: 'TEXT',
                    title: 'Sitio web',
                    value: 'http;//empresatextil.com.ar',
                    mandatory: true,
                },
            ],
        },
            {
                title: 'Sección A: Características generales de la emppresa',
                questions: [
                    {
                        type: 'SELECT',
                        title: 'Actividad principal',
                        value: 2,
                        options: [
                            "Comercialización al exterior",
                            "Fábrica",
                            "Construcción",
                        ],
                        description: '(*) Si la empresa factura por horas o distancia recorrida',
                        mandatory: true,
                    },
                    {
                        type: 'CHOICE',
                        title: 'Realizó inversiones durante 2019?',
                        value: 1,
                        options: [
                            "Sí",
                            "No",
                        ],
                        mandatory: true,
                    },
                    {
                        type: QUESTION_TYPE.FILE,
                        title: 'Archivo 1',
                        value: { '0': { name: "Archivo1.pdf" } },
                        mandatory: true,
                    },
                    {
                        type: 'TEXT',
                        title: '¿En qué invirtió?',
                        value: 'En diferentes cosas que /n ocupan /n  muchas /n lineas',
                        multiline: true,
                    },
                    {
                        type: QUESTION_TYPE.GROUPED,
                        title: '¿En qué invirtió?',
                        questions: [
                            {
                                type: QUESTION_TYPE.TEXT,
                                title: 'Reinversión de utilidades',
                                value: '10',
                                adornment: '%'
                            },
                            {
                                type: QUESTION_TYPE.TEXT,
                                title: 'Aportes',
                                value: '10',
                                adornment: '%'
                            },
                            {
                                type: QUESTION_TYPE.TEXT,
                                title: 'Programas públicos',
                                value: '10',
                                adornment: '%'
                            },
                            {
                                type: QUESTION_TYPE.TEXT,
                                title: 'Otros',
                                value: '70',
                                adornment: '%'
                            },
                            {
                                type: QUESTION_TYPE.TEXT,
                                title: 'Especificar "Otros"',
                                value: 'Otras cosas',
                            },
                        ],
                    },
                    {
                        type: 'NUMBER',
                        title: '¿En qué año invirtió?',
                        description: 'Min: 1980 / Max: 2020',
                        value: 2020,
                        restrictions: {
                            min: 1980,
                            max: 2020
                        }
                    },
                ],
            }
        ]
    },
];

export const inProgressForms = [
];

export const notStartedForms = [
    {
        id: '4',
        userId: 'abcd',
        name: 'Cuestionario sobre la empresa',
        description: 'Este es un cuestinonario sobre la empresa',
        status: STATUS.NOT_STARTED,
        sections: [{
            title: 'Datos de Identificación de la Empresa',
            description: 'Ingresá todos los datos',
            questions: [
                {
                    type: 'TEXT',
                    title: 'Nombre o razón social de la empresa',
                    value: '',
                    mandatory: true,
                },
                {
                    type: 'TEXT',
                    title: 'CUIT',
                    value: '',
                    mandatory: true,
                },
                {
                    type: 'TEXT',
                    title: 'Domicilio',
                    value: '',
                    mandatory: true,
                },
                {
                    type: 'TEXT',
                    title: 'CP',
                    value: '',
                    mandatory: true,
                },
                {
                    type: 'TEXT',
                    title: 'Localidad',
                    value: '',
                    mandatory: true,
                },
                {
                    type: 'TEXT',
                    title: 'Partido / departamento',
                    value: '',
                    mandatory: true,
                },
                {
                    type: 'TEXT',
                    title: 'Provincia',
                    value: '',
                    mandatory: true,
                },
                {
                    type: 'TEXT',
                    title: 'Teléfono',
                    value: '',
                    mandatory: true,
                },
                {
                    type: 'TEXT',
                    title: 'email',
                    value: '',
                    mandatory: true,
                },
                {
                    type: 'TEXT',
                    title: 'Sitio web',
                    value: '',
                    mandatory: true,
                },
            ],
        },
            {
                title: 'Sección A: Características generales de la emppresa',
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
                        description: 'Elija una',
                        disclaimer: '(*) Si la empresa factura por horas o distancia recorrida, considerarlo en la facturación final',
                        mandatory: true,
                    },
                    {
                        type: 'CHOICE',
                        title: 'Realizó inversiones durante 2019?',
                        value: 1,
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
                        title: '¿En qué invirtió?',
                        value: '',
                        multiline: true,
                    },
                    {
                        type: QUESTION_TYPE.GROUPED,
                        title: '¿En qué invirtió?',
                        questions: [
                            {
                                type: QUESTION_TYPE.TEXT,
                                title: 'Reinversión de utilidades',
                                value: '',
                                adornment: '%'
                            },
                            {
                                type: QUESTION_TYPE.TEXT,
                                title: 'Aportes',
                                value: '',
                                adornment: '%'
                            },
                            {
                                type: QUESTION_TYPE.TEXT,
                                title: 'Programas públicos',
                                value: '',
                                adornment: '%'
                            },
                            {
                                type: QUESTION_TYPE.TEXT,
                                title: 'Otros',
                                value: '',
                                adornment: '%'
                            },
                            {
                                type: QUESTION_TYPE.TEXT,
                                title: 'Especificar "Otros"',
                                value: '',
                            },
                        ],
                    },
                    {
                        type: 'NUMBER',
                        title: '¿En qué año invirtió?',
                        description: 'Min: 1980 / Max: 2020',
                        value: 2020,
                        restrictions: {
                            min: 1980,
                            max: 2020
                        }
                    },
                ],
            }
        ]
    },
];