import { v4 as uuid } from 'uuid';

/** Class User representing a user */

export interface IUser {
  id?: string;
  name?: string;
  login?: string;
  password?: string;
}

export class User {
  id: string;

  name: string;
  
  login: string;

  password: string;

  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: User): Omit<User, 'password'> {
    const { id, name, login } = user;
    return { id, name, login };
  }

  static fromRequest(reqBody: User): User {
    const user = new User(reqBody);
    return { ...user };
  }
}
