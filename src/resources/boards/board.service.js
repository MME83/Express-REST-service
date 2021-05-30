/**
 * Board service
 * @module board/service
 */
const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');
const Board = require('./board.model');

/**
 * Calls repository to retrieve all boards
 * @returns {Promise<Array<Board>>} promise resolving to array of boards
 * {@link module:board/repository}
 */
const getAll = () => boardsRepo.getAll();

/**
 * Calls board/repository to retrieve one board by id
 * @param {String} id board id
 * @throws {NotFound} if board was not found
 * @returns {Promise<Board>} promise resolving to board
 * {@link module:board/repository}
 */
const getById = (id) => boardsRepo.getById(id);

/**
 * Forwards a newly-created Board instance to repository
 * @param {Object} props collection of key: value pairs
 * @returns {Promise<Board>} promise resolving to board
 * {@link module:board/repository}
 */
const create = (props) => boardsRepo.create(new Board(props));

/**
 * Forwards new props that should be applied to board with id to repository
 * @param {String} id board id
 * @param {Object} props collection of key: value pairs
 * @throws {BadRequest} rejects if board was not found
 * @returns {Promise<Board>} promise resolving to Board
 * {@link module:board/repository}
 */
const update = (id, props) => boardsRepo.update(id, props);

/**
 * Calls repository to remove board and task service to remove all tasks associated with removed board
 * @param {String} id board id
 * @throws {NotFound} rejects if no Board found with the id
 * @returns {void}
 * {@link module:board/repository}
 * {@link module:task/service}
 */
const remove = async (id) => {
    await boardsRepo.remove(id);
    await tasksService.removeAllOnBoard(id);
};

module.exports = { getAll, getById, create, update, remove };