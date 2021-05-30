/**
 * Task repository
 * @module task/repository
 */
const memoryDb = require('../../memoryDB/memoryDb');

const Task = require('./task.model');
const { NotFound } = require('../../utils/notfound');
const { BadRequest } = require('../../utils/badrequest');

const tableMemoryDb = 'Tasks';

/**
 * Task instance type
 * @typedef {Object} Task
 * @ignore
 * @property {String} id id
 * @property {String} title title
 * @property {String} description description
 * @property {String|null} userId id of the user assigned to this instance
 * @property {String|null} boardId id of the board this instance belongs to
 * @property {String|null} columnId id of the column this instance belongs to
 * @property {Number} order order of this instance within its Column
 */

/**
 * Retrieves all Tasks from a given boardId
 * @param {String} boardId id of a board the task belongs to
 * @returns {Promise<Array<Task>>} promise resolving to array tasks
 */
const getAll = async (boardId) => 
  memoryDb.getAllEntitiesByProps(tableMemoryDb, { boardId });

/**
 * Retrieves a Task instance by id and boardId
 * @param {String} boardId id of a board the task belongs to
 * @param {String} id task id
 * @throws {NotFound} rejects if no task with id was found on the board
 * @returns {Promise<Task>} promise resolving to task
 */
const getById = async (boardId, id) => {
    const task = await memoryDb.getEntityByIdAndProps(tableMemoryDb, id, { boardId });

    if (!task) {
      throw new NotFound(`Task with id:${id} and boardId:${boardId} not found`);
    }
    
    return task;
}

/**
 * Forwards a task instance to database
 * @param {Task} taskInstance task instance
 * @returns {Promise<Task>} promise resolving to task instance
 */
const create = async (task) => memoryDb.createEntity(tableMemoryDb, task);

/**
 * Forwards set of new props to be applied to task on board
 * @param {String} boardId id of board where task is found
 * @param {String} id task id
 * @param {Object} props collection of key: value pairs
 * @throws {BadRequest} rejects if no Tasks with id was found on the board
 * @returns {Promise<Task>} promise resolving to updated Task
 */
const update = async (boardId, id, props) => {
  const task = await memoryDb.updateEntity(tableMemoryDb, id, props);

  if (!task) {
    throw new BadRequest(`Task with id:${id} and boardId:${boardId} not exist`);
  }

  return task;
};

/**
 * Deletes task from a given board
 * @param {String} boardId id of a board
 * @param {String} id task id
 * @throws {NotFound} rejects if no tasks with id was found on the board
 * @returns {void}
 */
const remove = async (boardId, id) => {
  const task = await memoryDb.deleteEntity(tableMemoryDb, id);

  if (!task) {
    throw new NotFound(`Task with id:${id} and boardId:${boardId} not found`);
  }
};

/**
 * Deletes all tasks on a given board
 * @param {String} boardId board id
 * @returns {void}
 */
const removeAllOnBoard = async (boardId) => {
  const tasks = await memoryDb.getAllEntitiesByProps(tableMemoryDb, { boardId });

  tasks.forEach(async (task) => {
    await remove(boardId, task.id);
  });
};

/**
 * If userId of a task equals the provided userId, sets Task's userId to null
 * @param {String} userId user id
 * @returns {void}
 */
const removeUserBinding = async (userId) => {
  const tasks = await memoryDb.getAllEntities(tableMemoryDb);

  tasks.forEach(async (task) => {
    if (task.userId === userId) {
      await update(task.boardId, task.id, new Task({ ...task, userId: null }));
    }
  });
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    removeAllOnBoard,
    removeUserBinding,
  };