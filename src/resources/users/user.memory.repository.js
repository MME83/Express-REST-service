/**
 * User repository
 * @module user/repository
 */
const memoryDb = require('../../memoryDB/memoryDb');

const tableMemoryDb = 'Users';
const { NotFound } = require('../../utils/notfound');
const { BadRequest } = require('../../utils/badrequest');

/**
 * User instance type
 * @typedef {Object} User
 * @ignore
 * @property {String} id user id
 * @property {String} name user name
 * @property {String} login user login
 * @property {String} password user password
 */

/**
 * Retrieves all users in database
 * @returns {Promise<Array<User>>}  a promise resolving to an array of users
 */
const getAll = async () => memoryDb.getAllEntities(tableMemoryDb);

/**
 * Retrieves a user by id
 * @param {String} id  user id
 * @throws {NotFound} rejects if no user found
 * @returns {Promise<User>} promise resolving to user instance
 */
const getById = async (id) => {
  const user = await memoryDb.getEntityById(tableMemoryDb, id);
  
  if (!user) {
    throw new NotFound(`User with id:${id} not found`);
  }

  return user;
}

/**
 * Sends a User instance to database
 * @param {User} userInstance user instance
 * @returns {Promise<User>} a promise resolving to user
 */
const create = async (user) => memoryDb.createEntity(tableMemoryDb, user);

/**
 * Forwards props with new values to database to create a new User
 * @param {String} id user id
 * @param {Object} props collection of key: value pairs
 * @throws {BadRequest} rejects if no user found with the id
 * @returns {Promise<User>} promise resolving to user
 */
const update = async (id, props) => {
  const user = await memoryDb.updateEntity(tableMemoryDb, id, props);
  
  if (!user) {
    throw new BadRequest(`User with id:${id} not exist`);
  }

  return user;
};

/**
 * Removes/deletes user by id
 * @param {String} id  user id
 * @throws {NotFound}  rejects if no User found
 * @returns {void}
 */
const remove = async (id) => {
  const user = await memoryDb.deleteEntity(tableMemoryDb, id);

  if (!user) {
    throw new NotFound(`User with id:${id} not found`);
  }
};

module.exports = { getAll, getById, create, update, remove };
