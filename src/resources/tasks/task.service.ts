// import { DeleteResult, UpdateResult } from 'typeorm';
import tasksRepository from './task.repository';
import { ITask } from '../../entities/task';

const getAll = (boardId: string): Promise<Array<ITask>> => tasksRepository.getAll(boardId);

const createTask = (boardId: string, task: Omit<ITask, 'id'>): Promise<ITask | undefined> => 
  tasksRepository.createTask(boardId, task);

const getTaskById = (boardId: string, taskId: string): Promise<ITask | undefined> => 
  tasksRepository.getTaskById(boardId, taskId);

const updateTask = (boardId: string, taskId: string, updatedTask: Partial<ITask>): Promise<ITask | undefined> => 
  tasksRepository.updateTask(boardId, taskId, updatedTask);

const deleteTaskById = (boardId: string, taskId: string): Promise<void> => 
  tasksRepository.deleteTaskById(boardId, taskId);

export default {
    getAll,
    createTask,
    getTaskById,
    updateTask,
    deleteTaskById,
};