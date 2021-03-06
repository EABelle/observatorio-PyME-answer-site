export const STATUS = {
    COMPLETE: 'COMPLETE',
    IN_PROGRESS: 'IN_PROGRESS',
    NOT_STARTED: 'NOT_STARTED'
};

export const QUESTION_TYPE = {
    TEXT: 'TEXT',
    CHOICE: 'CHOICE',
    MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
    NUMBER: 'NUMBER',
    GROUPED: 'GROUPED',
    FILE: 'FILE',
    SELECT: 'SELECT',
};

export const CRUD_ACTION = {
    CREATE: 'CREATE',
    READ: 'READ',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
}

export const CRUD_ACTION_MESSAGE = {
    [CRUD_ACTION.CREATE]: 'Crear',
    [CRUD_ACTION.READ]: 'Ver',
    [CRUD_ACTION.UPDATE]: 'Editar',
    [CRUD_ACTION.DELETE]: 'Borrar',
}