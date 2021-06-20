import usersRepo from './user.memory.repository';
import { User } from './user.model';
import taskService from '../tasks/task.service';

const getAll = (): Promise<User[]> => usersRepo.getAll();

const getById = (id: string): Promise<User> => usersRepo.getById(id);

const create = (user: User): Promise<User> => usersRepo.create(user);

const update = (id: string, entity: Partial<User>): Promise<User | undefined> =>
    usersRepo.update(id, entity);

const remove = (id: string): Promise<void> => {
    taskService.removeUserBinding(id);
    return usersRepo.remove(id);
};

export default { getAll, getById, create, update, remove };
