import usersRepository from './user.repository';
// import tasksService from '../tasks/task.service';
import { IUser } from '../../entities/user';
// import taskRepository from '../tasks/task.repository';
// import taskService from '../tasks/task.service';

const getAll = (): Promise<IUser[]> => usersRepository.getAll();

const createUser = (user: Omit<IUser, 'id'>): Promise<IUser | undefined> => usersRepository.createUser(user);

const getUserById = (id: string): Promise<IUser | undefined> => usersRepository.getUserById(id);

const updateUser = (id: string, updatedUser: Partial<IUser>): Promise<IUser | undefined> => 
  usersRepository.updateUser(id, updatedUser);

const deleteUserById = async (id: string): Promise<void> => 
  // await tasksService.unsignUserFromTask(id);
   usersRepository.deleteUserById(id);

export default { getAll, createUser, getUserById, updateUser, deleteUserById };
