const memoryDb = require('../../memoryDB/memoryDb');

const tableMemoryDb = 'Users';
const { NotFound } = require('../../utils/notfound');
const { BadRequest } = require('../../utils/badrequest');

const getAll = async () => memoryDb.getAllEntities(tableMemoryDb);

const getById = async (id) => {
  const user = await memoryDb.getEntityById(tableMemoryDb, id);
  
  if (!user) {
    throw new NotFound(`User with id:${id} not found`);
  }

  return user;
}

const create = async (user) => memoryDb.createEntity(tableMemoryDb, user);

const update = async (id, props) => {
  const user = await memoryDb.updateEntity(tableMemoryDb, id, props);
  
  if (!user) {
    throw new BadRequest(`User with id:${id} not exist`);
  }

  return user;
};

const remove = async (id) => {
  const user = await memoryDb.deleteEntity(tableMemoryDb, id);

  if (!user) {
    throw new NotFound(`User with id:${id} not found`);
  }
};

module.exports = { getAll, getById, create, update, remove };
