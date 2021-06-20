import memoryDb from '../../memoryDB/memoryDb';
import NotFound from '../../utils/notfound';
import BadRequest from '../../utils/badrequest';
import { User } from './user.model';

// const tableMemoryDb = 'Users';

const userDB: User[] = memoryDb.Users;

const getAll = async (): Promise<User[]> => {
  const users = userDB.filter((entity) => entity);

  return users;
}

const getById = async (id: string): Promise<User> => {
  const user = userDB.find((item) => item.id === id);   
  
  if (!user) {
    throw new NotFound(`User with id:${id} not found`);
  }

  return user;
};

const create = async (user: User): Promise<User> => {
  const newUser = userDB.push(user);

  if (!newUser) {
    throw new BadRequest(`User has not created`);
  }
  
  return getById(user.id as string);
};

const update = async (id: string, props: Partial<User>): Promise<User | undefined> => {
  const IndexUser = userDB.findIndex((item) => item.id === id);

  if (IndexUser === -1) {
    throw new BadRequest(`User with id:${id} not exist`);
  }
  
  const task = userDB[IndexUser] as User;
  userDB[IndexUser] = ({ ...task, ...props});
  
  // Object.assign(userDB[IndexUser], props);

  return userDB[IndexUser];
};

const remove = async (id: string): Promise<void> => {
  const entity = await getById(id);
 
  if (!entity) {
    throw new NotFound(`User with id:${id} not found`);
  }
  
  const IndexUser = userDB.indexOf(entity);
  
  if (IndexUser > -1) {
    userDB.splice(IndexUser, 1);
  }
};

export default { getAll, getById, create, update, remove };
