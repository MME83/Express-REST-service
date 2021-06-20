/**
 * Task repository
 * @module task/repository
 */

import memoryDb from '../../memoryDB/memoryDb';
import { Task } from './task.model';
import NotFound from '../../utils/notfound';
import BadRequest from '../../utils/badrequest';

let taskDB: Task[] = memoryDb.Tasks;

const getAll = async (boardId: string): Promise<Task[]> =>
    taskDB.filter((entity) => entity.boardId === boardId);

const getById = async (id: string ): Promise<Task> => {
  const task = taskDB.find((entity) => entity.id === id);

  if (!task) {
    throw new NotFound(`Task with id:${id} not found`);
  }

  return task;
};

const create = async (task: Task): Promise<Task> => {
  const newTask = taskDB.push(task);

  if (!newTask) {
    throw new BadRequest(`Task has not created`);
  }

  return getById(task.id);
}

const update = async (id: string, props: Task): Promise<Task | undefined> => {
  const task = await getById(id);

  if (!task) {
    throw new BadRequest(`Task with id:${id} not exist`);
  }

  const IndexTask = taskDB.indexOf(task);
  taskDB[IndexTask] = ({ ...task, ...props});

  return taskDB[IndexTask];
};

const remove = async (id: string): Promise<Task | undefined> => {
  const IndexTask = taskDB.findIndex((item) => item.id === id);
 
  if (IndexTask === -1) {
    throw new Error(`Task with id:${id} not found`);
  }
  const currentItem = taskDB[IndexTask];
  taskDB.splice(IndexTask, 1);
  return currentItem;
}

const removeAllOnBoard = async (boardId: string): Promise<void> => {
  
  taskDB = taskDB.filter((task) => task.boardId !== boardId); 
};

const removeUserBinding = async (userId: string): Promise<void> => {
  
  taskDB = taskDB.map((task) =>
    task.userId !== userId ? task : ({ ...task, userId: null })
  );
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
  removeAllOnBoard,
  removeUserBinding,
};