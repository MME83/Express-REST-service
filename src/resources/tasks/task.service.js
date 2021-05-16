const Task = require('./task.model');
const tasksRepo = require('./task.memory.repository');

const getAll = (boardId) => tasksRepo.getAll(boardId);
const getById = (boardId, id) => tasksRepo.getById(boardId, id);
const save = (boardId, task) => tasksRepo.save(new Task({...task, boardId}));
const remove = (boardId, id) => tasksRepo.remove(boardId, id);
const removeAllOnBoard = (boardId) => tasksRepo.removeAllOnBoard(boardId);
const removeUserBinding = (userId) => tasksRepo.removeUserBinding(userId);
const update = (boardId, id, task) => tasksRepo.update(boardId, id, task);

module.exports = {
    getAll,
    getById,
    save,
    remove,
    update,
    removeAllOnBoard,
    removeUserBinding,
};