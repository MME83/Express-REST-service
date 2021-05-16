const User = require('./user.model');
const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();
const getById = (id) => usersRepo.getById(id);
const save = (props) => usersRepo.save(new User(props));
const remove = async (id) => {
    await usersRepo.remove(id);
    await tasksService.removeUserBinding(id);
};
const update = (id, props) => usersRepo.update(id, props);

module.exports = { getAll, getById, save, remove, update };
