import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Task } from "./task";

export interface IUser {
    id: string;
    name: string;
    login: string;
    password: string;
  }

@Entity({ name: 'users' })
export class User implements IUser {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    
    @Column('varchar', { length: 255, default: 'default_user-name' })
    name!: string;

    @Column('varchar', { length: 28, default: 'def-Login' })
    login!: string;

    @Column('varchar', { length: 255, default: 'P@55w0rd', select: false })
    password!: string;

    @OneToMany(() => Task, task => task.userId, { cascade: true })
    tasks!: Task[];

    static toResponse(user: IUser): Omit<IUser, 'password'> {
      const { id, name, login } = user;

      return { id, name, login };
    }
}