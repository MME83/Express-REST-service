import tasksRepo from './task.memory.repository';
import { Task } from './task.model';

const getAll = (boardId: string): Promise<Array<Task>> => tasksRepo.getAll(boardId);

const getById = (id: string): Promise<Task> => tasksRepo.getById(id);

const create = (task: Task): Promise<Task> => tasksRepo.create(task);

const update = (
    id: string,
    task: Task
  ): Promise<Task | undefined> => tasksRepo.update(id, task);

const remove = (id: string): Promise<Task | undefined> => tasksRepo.remove(id);

const removeAllOnBoard = (boardId: string): Promise<void> => tasksRepo.removeAllOnBoard(boardId);

const removeUserBinding = (userId: string): Promise<void> => tasksRepo.removeUserBinding(userId);

export default {
    getAll,
    getById,
    create,
    update,
    remove,
    removeAllOnBoard,
    removeUserBinding
};