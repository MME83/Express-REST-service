const BOARDS = [];

const getAll = async () => BOARDS;

const getById = async (id) => {
    const entities = await BOARDS.filter((item) => id === item.id);
    return entities[0];
}

const save = async (board) => { 
    BOARDS.push(board);
    return getById(board.id);
};

const remove = async (id) => {
    const removeIndex = await BOARDS.map(item => item.id).indexOf(id);

    return BOARDS.splice(removeIndex, 1);
};

const update = async (id, props) => {
    const entity = await getById(id);
    
    if (entity) {
      const entityIndex = BOARDS.indexOf(entity);
      
      BOARDS[entityIndex] = new entity.constructor({
        ...entity,
        ...props,
      });
    }
  
    return getById(id);
};

module.exports = { getAll, getById, save, remove, update };