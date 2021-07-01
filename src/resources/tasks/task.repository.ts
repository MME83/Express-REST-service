/* eslint-disable dot-notation */
/**
 * Task repository
 * @module task/repository
 */
import { getRepository } from 'typeorm';
import { ITask, Task } from '../../entities/task';

const getAll = async (boardId: string): Promise<ITask[]> => getRepository(Task)
    .createQueryBuilder('task')
    .where('task.boardId = :boardId', { boardId })
    .getMany();

const getTaskById = async (boardId: string, id: string ): Promise<ITask | undefined> =>
  getRepository(Task).findOne({ boardId, id });

const createTask = async (boardId: string, task: Omit<ITask, 'id'>): Promise<ITask | undefined> => {
  const { generatedMaps } = await getRepository(Task)
    .createQueryBuilder()
    .insert()
    .into(Task)
    .values([{ ...task, boardId }])
    .execute();
  
  return getTaskById(boardId, generatedMaps?.[0]?.['id']);
};

const updateTask = async (boardId: string, taskId: string, updatedTask: Partial<ITask>): Promise<ITask | undefined> => {
  await getRepository(Task)
    .createQueryBuilder()
    .update(Task)
    .set(updatedTask)
    .where('boardId = :boardId', { boardId })
    .andWhere('id = :taskId', { taskId })
    .execute();

  return getTaskById(boardId, taskId);
};

const deleteTaskById = async (boardId: string, taskId: string): Promise<void> => {
  await getRepository(Task)
    .createQueryBuilder()
    .delete()
    .from(Task)
    .where('boardId = :boardId', { boardId })
    .andWhere('id = :taskId', { taskId })
    .execute();
};

export default {
  getAll,
  createTask,
  getTaskById,
  updateTask,
  deleteTaskById,
}
