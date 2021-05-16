const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');
const Board = require('./board.model');

const getAll = () => boardsRepo.getAll();
const getById = (id) => boardsRepo.getById(id);
const save = (props) => boardsRepo.save(new Board(props));
const remove = async (id) => {
    await boardsRepo.remove(id);
    await tasksService.removeAllOnBoard(id);
};
const update = (id, props) => boardsRepo.update(id, props);

module.exports = { getAll, getById, save, remove, update };