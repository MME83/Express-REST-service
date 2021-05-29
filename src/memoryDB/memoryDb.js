// const User = require('../resources/users/user.model');
// const Board = require('../resources/boards/board.model');
// const Task = require('../resources/tasks/task.model');

const memoryDb = {
    Tasks: [],
    Users: [],
    Boards: [],
};

const getAllEntities = async (tableMemoryDb) => 
    memoryDb[tableMemoryDb].filter((entity) => entity);


const getAllEntitiesByProps = async (tableMemoryDb, props) => {
    const keys = Object.keys(props);

    return memoryDb[tableMemoryDb].filter((entity) =>
        keys.every((key) => props[key] === entity[key])
    );
};

const getEntityById = async (tableMemoryDb, id) => {
    const entity = memoryDb[tableMemoryDb].filter((item) => id === item.id);
    return entity[0];
};

const getEntityByIdAndProps = async (tableMemoryDb, id, props) => {
    const keys = Object.keys(props);
    const entities = memoryDb[tableMemoryDb].filter((entity) => {
        const propCondition = keys.every((key) => props[key] === entity[key]);
        const idCondition = entity.id === id;
        
        return propCondition && idCondition;
    });

    return entities[0];
}

const createEntity = async (tableMemoryDb, entity) => {
    memoryDb[tableMemoryDb].push(entity);

    return getEntityById(tableMemoryDb, entity.id);
};

const updateEntity = async (tableMemoryDb, id, props) => {
    const entity = await getEntityById(tableMemoryDb, id);

    if (entity) {
        const entityIndex = memoryDb[tableMemoryDb].indexOf(entity);

        memoryDb[tableMemoryDb][entityIndex] = new entity.constructor({
            ...entity,
            ...props,
        });
    }

    return getEntityById(tableMemoryDb, id);
};

const deleteEntity = async (tableMemoryDb, id) => {
    const entity = await getEntityById(tableMemoryDb, id);
   
    if (entity) {
        memoryDb[tableMemoryDb] = memoryDb[tableMemoryDb].filter((ent) => ent !== entity);
    }

    return !!entity;
    
};

module.exports = { 
    getAllEntities,
    getAllEntitiesByProps,
    getEntityById,
    getEntityByIdAndProps,
    createEntity,
    updateEntity,
    deleteEntity
};