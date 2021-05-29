const memoryDb = require('../../memoryDB/memoryDb');

const tableMemoryDb = 'Boards';
const { NotFound } = require('../../utils/notfound');
const { BadRequest } = require('../../utils/badrequest');

const getAll = async () => memoryDb.getAllEntities(tableMemoryDb);

const getById = async (id) => {
    const board = await memoryDb.getEntityById(tableMemoryDb, id);

    if (!board) {
      throw new NotFound(`Board with id:${id} not found`);
    }

    return board;
}

const create = async (board) => memoryDb.createEntity(tableMemoryDb, board);

const update = async (id, props) => {
  const board = await memoryDb.updateEntity(tableMemoryDb, id, props);

  if (!board) {
    throw new BadRequest(`Board with id:${id} not exist`);
  }

  return board;
};

const remove = async (id) => {
  const board = await memoryDb.deleteEntity(tableMemoryDb, id);

  if (!board) {
    throw new NotFound(`Board with id:${id} not found`);
  }
};

module.exports = { getAll, getById, create, update, remove };