const USERS = [];

const getAll = async () => USERS;
const getById = async (id) => {
  const entities = USERS.filter((item) => id === item.id); // USERS.find(user => user.id === id);
  return entities[0];
}
const save = async (entity) => { 
  USERS.push(entity);
  return getById(entity.id);
};
const remove = async (id) => {
  const removeIndex = await USERS.map(item => item.id).indexOf(id);

  return USERS.splice(removeIndex, 1);
  /* return (USERS.splice(USERS.map(user => {
    return user.id;
  }).indexOf(id), 1)); */
};
const update = async (id, props) => {
  const entity = await getById(id);
  
  if (entity) {
    const entityIndex = USERS.indexOf(entity);
    
    USERS[entityIndex] = new entity.constructor({
      ...entity,
      ...props,
    });
  }

  return getById(id);
};

module.exports = { getAll, getById, save, remove, update };
