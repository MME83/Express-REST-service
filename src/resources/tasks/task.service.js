const Task = require('./task.model');
const tasksRepo = require('./task.memory.repository');

const getAll = (boardId) => tasksRepo.getAll(boardId);
const getById = (boardId, id) => tasksRepo.getById(boardId, id);
const create = (boardId, task) => tasksRepo.create(new Task({...task, boardId}));
const remove = (boardId, id) => tasksRepo.remove(boardId, id);
const update = (boardId, id, task) => tasksRepo.update(boardId, id, task);
const removeAllOnBoard = (boardId) => tasksRepo.removeAllOnBoard(boardId);
const removeUserBinding = (userId) => tasksRepo.removeUserBinding(userId);

module.exports = {
    getAll,
    getById,
    create,
    remove,
    update,
    removeAllOnBoard,
    removeUserBinding
};