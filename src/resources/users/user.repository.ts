import { getRepository, getConnection } from 'typeorm';
import NotFound from '../../utils/notfound';
// import BadRequest from '../../utils/badrequest';
import { IUser, User } from '../../entities/user';

const getAll = async (): Promise<IUser[]> => getRepository(User).find();

const getUserById = async (id: string): Promise<IUser> => {
  const user = await getRepository(User).findOne(id);

  if (!user) {
    throw new NotFound(`User with id:${id} has not found`);
  }

  return user;
};

const createUser = async (user: Omit<IUser, 'id'>): Promise<IUser> => {
  const { identifiers } = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(User)
    .values([user])
    .execute();
    
  return getUserById(identifiers[0]?.['id']);
};

const updateUser = async (id: string, updatedUser: Partial<IUser>): Promise<IUser> => {
  await getConnection()
    .createQueryBuilder()
    .update(User)
    .set(updatedUser)
    .where('id = :id', { id })
    .execute();
  
  return getUserById(id);
};

const deleteUserById = async (id: string): Promise<void> => { 
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(User)
    .where('id = :id', { id })
    .execute();
};

export default {
  getAll,
  createUser,
  getUserById,
  updateUser,
  deleteUserById,
}
