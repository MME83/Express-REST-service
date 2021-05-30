/**
 * User service
 * @module user/service
 */
const User = require('./user.model');
const usersRepo = require('./user.memory.repository');
const taskService = require('../tasks/task.service');

/**
 * Calls repository and retrieves all users
 * @returns {Promise<Array<User>>} promise resolving to array of users
 * {@link module:user/repository}
 */
const getAll = () => usersRepo.getAll();

/**
 * Calls repository and retrieves one user by id
 * @param {String} id user id
 * @throws {NotFound} rejects if no user found
 * @returns {Promise<User>} promise resolving to user
 * {@link module:user/repository}
 */
const getById = (id) => usersRepo.getById(id);

/**
 * Creates a user from props and sends to repository to be added to database
 * @param {props} userProps collection of key: value pairs
 * @returns {Promise<User>} promise resolving to user
 * {@link module:user/repository}
 */
const create = (props) => usersRepo.create(new User(props));

/**
 * Forwards new user props to repository
 * @param {String} id user id
 * @param {Object} props collection of key: value pairs
 * @throws {BadRequest} rejects if no user found
 * @returns {Promise<User>} promise resolving to user
 * {@link module:user/repository}
 */
const update = (id, props) => usersRepo.update(id, props);

/**
 * Forwards id of a user to be removed to repository, cleans up tasks
 * @param {String} id user id
 * @throws {NotFound} rejects if no User found
 * @returns {void}
 * {@link module:user/repository}
 * {@link module:task/service}
 */
const remove = async (id) => {
    await usersRepo.remove(id);
    await taskService.removeUserBinding(id);
};

module.exports = { getAll, getById, create, update, remove};
