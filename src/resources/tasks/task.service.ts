/**
 * Task service
 * @module task/service
 */
import tasksRepo from './task.memory.repository';
import Task from './task.model';
import ITaskProps from './task.types';

/**
 * Forwards boardId to repository and retrieves all tasks on that board
 * @param {String} boardId board id
 * @returns {Promise<Array<Task>>} promise resolving to array of tasks on board
 * {@link module:task/repository}
 */
const getAll = async (boardId: string): Promise<Task[]> => tasksRepo.getAll(boardId);

/**
 * Forwards boardId and task id to repository and retrieves task with id on board
 * @param {String} boardId board id
 * @param {String} id task id
 * @throws {NotFound} rejects if no tasks with id was found on the board
 * @returns {Promise<Task>} promise resolving to task on board
 * {@link module:task/repository}
 */
const getById = async (boardId: string, id: string): Promise<Task> => tasksRepo.getById(boardId, id);

/**
 * Creates a new Task instance from props and forwards to repository to be added to db
 * @param {String} boardId board id
 * @param {Object} props collection of key: value pairs
 * @returns {Promise<Task>} promise resolving to task on board
 * {@link module:task/repository}
 */
const create = async (boardId: string, task: ITaskProps): Promise<Task> => tasksRepo.create(new Task({...task, boardId}));

/**
 * Forwards new props to be applied to task on board
 * @param {String} boardId board id
 * @param {String} id task id
 * @param {Object} props a collection of key: value pairs
 * @throws {BadRequest} rejects if no task with id was found on the board
 * @returns {Task}
 * {@link module:task/repository}
 */
const update = async (
    boardId: string,
    id: string,
    task: ITaskProps
  ): Promise<Task> => tasksRepo.update(boardId, id, task);

/**
 * Calls repository to remove task on board
 * @param {String} boardId - board id
 * @param {String} id - task id
 * @throws {NotFound} rejects if no tasks with id was found on the board
 * @returns {void}
 * {@link module:task/repository}
 */
const remove = async (boardId: string, id: string): Promise<void> => tasksRepo.remove(boardId, id);

/**
 * Forwards boardId to repository to find and remove all tasks on board
 * @param {String} boardId board id
 * @returns {void}
 * {@link module:task/repository}
 */
const removeAllOnBoard = async (boardId: string): Promise<void> => tasksRepo.removeAllOnBoard(boardId);

/**
 * Forwards userId to repository to unbind user from all tasks
 * @param {String} userId user id
 * @return {void}
 * {@link module:task/repository}
 */
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