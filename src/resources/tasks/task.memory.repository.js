const memoryDb = require('../../memoryDB/memoryDb');

const Task = require('./task.model');
const { NotFound } = require('../../utils/notfound');
const { BadRequest } = require('../../utils/badrequest');

const tableMemoryDb = 'Tasks';

const getAll = async (boardId) => 
  memoryDb.getAllEntitiesByProps(tableMemoryDb, { boardId });

const getById = async (boardId, id) => {
    const task = await memoryDb.getEntityByIdAndProps(tableMemoryDb, id, { boardId });

    if (!task) {
      throw new NotFound(`Task with id:${id} and boardId:${boardId} not found`);
    }
    
    return task;
}

const create = async (task) => memoryDb.createEntity(tableMemoryDb, task);

const update = async (boardId, id, props) => {
  const task = await memoryDb.updateEntity(tableMemoryDb, id, props);

  if (!task) {
    throw new BadRequest(`Task with id:${id} and boardId:${boardId} not exist`);
  }

  return task;
};

const remove = async (boardId, id) => {
  const task = await memoryDb.deleteEntity(tableMemoryDb, id);

  if (!task) {
    throw new NotFound(`Task with id:${id} and boardId:${boardId} not found`);
  }
};

const removeAllOnBoard = async (boardId) => {
  const tasks = await memoryDb.getAllEntitiesByProps(tableMemoryDb, { boardId });

  tasks.forEach(async (task) => {
    await remove(boardId, task.id);
  });
};

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