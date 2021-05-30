/**
 * Board repository
 * @module board/repository
 */

const memoryDb = require('../../memoryDB/memoryDb');
const { NotFound } = require('../../utils/notfound');
const { BadRequest } = require('../../utils/badrequest');

const tableMemoryDb = 'Boards';

/**
 * Board instance type
 * @typedef {Object} Board
 * @ignore
 * @property {String} id board id
 * @property {String} title board title
 * @property {Array<Column>} columns an array of Column instances
 */

/**
 * Retrieves all instances of Board class
 * @returns {Promise<Array<Board>>} promise resolving to array of all boards
 */
const getAll = async () => memoryDb.getAllEntities(tableMemoryDb);

/**
 * Retrieves an instance of Board by id
 * @param {String} id board id
 * @throws {NotFound} if board wasn't found
 * @returns {Promise<Board>} promise resolving to board
 */
const getById = async (id) => {
    const board = await memoryDb.getEntityById(tableMemoryDb, id);

    if (!board) {
      throw new NotFound(`Board with id:${id} not found`);
    }

    return board;
}

/**
 * Forwards an instance of Board to be added to database
 * @param {Board} boardInstance board instance
 * @returns {Promise<Board>} promise resolving to provided boardInstance
 */
const create = async (board) => memoryDb.createEntity(tableMemoryDb, board);

/**
 * Forwards set of new props to be applied to board with id
 * @param {String} id board id
 * @param {Board} props collection of key: value pairs
 * @throws {BadRequest} rejects if board wasn't found with the id
 * @returns {Promise<Board>} promise resolving to updated Board instance
 */
const update = async (id, props) => {
  const board = await memoryDb.updateEntity(tableMemoryDb, id, props);

  if (!board) {
    throw new BadRequest(`Board with id:${id} not exist`);
  }

  return board;
};

/**
 * Forwards id of a board to be removed to database
 * @param {Sting} id board id
 * @throws {NotFound} rejects if board was not found
 * @returns {void}
 */
const remove = async (id) => {
  const board = await memoryDb.deleteEntity(tableMemoryDb, id);

  if (!board) {
    throw new NotFound(`Board with id:${id} not found`);
  }
};

module.exports = { getAll, getById, create, update, remove };