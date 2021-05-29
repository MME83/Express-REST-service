const User = require('./user.model');
const usersRepo = require('./user.memory.repository');
const taskService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();
const getById = (id) => usersRepo.getById(id);
const create = (props) => usersRepo.create(new User(props));
const update = (id, props) => usersRepo.update(id, props);
const remove = async (id) => {
    await usersRepo.remove(id);
    await taskService.removeUserBinding(id);
};

module.exports = { getAll, getById, create, update, remove};
