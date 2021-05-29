const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');
const Board = require('./board.model');

const getAll = () => boardsRepo.getAll();
const getById = (id) => boardsRepo.getById(id);
const create = (props) => boardsRepo.create(new Board(props));
const update = (id, props) => boardsRepo.update(id, props);
const remove = async (id) => {
    await boardsRepo.remove(id);
    await tasksService.removeAllOnBoard(id);
};

module.exports = { getAll, getById, create, update, remove };