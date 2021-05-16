const TASK = [];
const Task = require('./task.model');

const getEntitiesByProps = async (props) => {
    const keys = Object.keys(props);
  
    return TASK.filter((entity) =>
      keys.every((key) => props[key] === entity[key])
    );
};

const getEntityByIdAndProps = async (id, props) => {
    const keys = Object.keys(props);
    const entities = TASK.filter((entity) => {
      const propCondition = keys.every((key) => props[key] === entity[key]);
      const idCondition = entity.id === id;
  
      return propCondition && idCondition;
    });   
  
    return entities[0];
};

const getAll = async (boardId) => {

    getEntitiesByProps(TASK, { boardId });
};

const getById = async (boardId, id) => {
    const task = await getEntityByIdAndProps(TASK, id, { boardId });
   
    return task;
}

const save = async (task) => { 
    TASK.push(task);
    return getById(task.id);
};

const remove = async (boardId, id) => {
    const removeIndex = await TASK.map(item => item.id).indexOf(id);

    return TASK.splice(removeIndex, 1);
};


const update = async (boardId, id, props) => {
    const entity = await getById(id);
    
    if (entity) {
      const entityIndex = TASK.indexOf(entity);
      
      TASK[entityIndex] = new entity.constructor({
        ...entity,
        ...props,
      });
    }
  
    return getById(id);
};

const removeAllOnBoard = async (boardId) => {
    const removedTasks = await getEntityByIdAndProps(TASK, { boardId });
  
    removedTasks.forEach(async (task) => {
      await remove(boardId, task.id);
    });
};

const removeUserBinding = async (userId) => {
    const tasks = await TASK.filter((entity) => entity);
  
    tasks.forEach(async (task) => {
      if (task.userId === userId) {
        await update(task.boardId, task.id, new Task({ ...task, userId: null }));
      }
    });
  };



module.exports = {
    getAll,
    getById,
    save,
    remove,
    update,
    removeAllOnBoard,
    removeUserBinding,
  };