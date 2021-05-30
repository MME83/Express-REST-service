import IUserProps from '../resources/users/user.types';
import ITaskProps from '../resources/tasks/task.types';
import IBoardProps from '../resources/boards/board.types';
import Board from '../resources/boards/board.model';
import Task from '../resources/tasks/task.model';
import User from '../resources/users/user.model';

/**
 * An in-memory database object
 * @type {Object}
 * @property {Array<Task>} Tasks array of existing Task instances
 * @property {Array<User>} Users array of existing User instances
 * @property {Array<Board>} Boards array of existing Board instances
 */
const memoryDb = {
    Tasks: [],
    Users: [],
    Boards: [],
};

/**
 * Retrieves all instances of tableMemoryDb
 * @param {String} tableMemoryDb 'Tasks', 'Users', or 'Boards'
 * @returns {Promise<Array<Task|User|Board>>} a promise resolving to an array of all instances of a given tableMemoryDb
 */
const getAllEntities = async (tableMemoryDb) => 
    memoryDb[tableMemoryDb].filter((entity) => entity);

/**
 * Retrieves all instances that fit search criteria defined in props
 * @param {String} tableMemoryDb 'Tasks', 'Users', or 'Boards'
 * @param {Object} props an object of key: value pairs
 * @returns {Promise<Array<Task|User|Board>>} a promise resolving to an array of entities
 */
const getAllEntitiesByProps = async (tableMemoryDb, props) => {
    const keys = Object.keys(props);

    return memoryDb[tableMemoryDb].filter((entity) =>
        keys.every((key) => props[key] === entity[key])
    );
};

/**
 * Retrieves an entity by provided tableMemoryDb and id
 * @param {String} tableMemoryDb 'Tasks', 'Users', or 'Boards'
 * @param {String} id entity id
 * @returns {Promise<Task|User|Board|undefined>} a promise resolving to entity or undefined
 */
const getEntityById = async (tableMemoryDb, id) => {
    const entity = memoryDb[tableMemoryDb].filter((item) => id === item.id);
    return entity[0];
};

/**
 * Retrieves an entity by provided tableMemoryDb, id, and props
 * @param {String} tableMemoryDb Tasks', 'Users', or 'Boards'
 * @param {String} id entity id
 * @param {Object} props an object of key: value pairs
 * @returns {Promise<Task|User|Board|undefined>} a promise resolving to entity or undefined
 */
const getEntityByIdAndProps = async (tableMemoryDb, id, props) => {
    const keys = Object.keys(props);
    const entities = memoryDb[tableMemoryDb].filter((entity) => {
        const propCondition = keys.every((key) => props[key] === entity[key]);
        const idCondition = entity.id === id;
        
        return propCondition && idCondition;
    });

    return entities[0];
}

/**
 * Adds an entity to its collection
 * @param {String} tableMemoryDb 'Tasks', 'Users', or 'Boards'
 * @param {Board|Task|User} entity an instance of entity
 * @returns {Promise<Board|Task|User>} a promise resolving to entity
 */
const createEntity = async (tableMemoryDb, entity) => {
    memoryDb[tableMemoryDb].push(entity);

    return getEntityById(tableMemoryDb, entity.id);
};

/**
 * Finds an entity by tableMemoryDb and id, overwrites it with new props
 * @param {String} tableMemoryDb 'Tasks', 'Users', or 'Boards'
 * @param {String} id entity id
 * @param {Object} props collection of key: value pairs
 * @returns {Promise<Task|User|Board|undefined>} a promise resolving to entity or undefined
 */
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

/**
 * Deletes/removes an entity
 * @param {String} tableMemoryDb 'Tasks', 'Users', or 'Boards'
 * @param {String} id entity id
 * @returns {Promise<Boolean>} a promise resolving to true if entity was found, false - if wasn't
 */
const deleteEntity = async (tableMemoryDb, id) => {
    const entity = await getEntityById(tableMemoryDb, id);
   
    if (entity) {
        memoryDb[tableMemoryDb] = memoryDb[tableMemoryDb].filter((ent) => ent !== entity);
    }

    return !!entity;
};

export default { 
    getAllEntities,
    getAllEntitiesByProps,
    getEntityById,
    getEntityByIdAndProps,
    createEntity,
    updateEntity,
    deleteEntity
};