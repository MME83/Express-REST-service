import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Board } from "./board";
import { ColumnEntity } from "./column";
import { User } from "./user";

export interface ITask {
    id: string;
    title: string;
    order: number;
    description: string;
    userId: string | null;
    boardId: string;
    columnId: string;
}

@Entity({ name: 'tasks' })
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('varchar', { length: 255, default: 'Task_title' })
    title!: string;

    @Column('int', { default: 0 })
    order!: number;

    @Column('varchar', { length: 255, default: 'Task_description' })
    description!: string;

    @ManyToOne(() => User, { onDelete: 'SET NULL' })
    @Column('varchar', { name: 'userIdId', nullable: true})
    userId!: string | null;

    @ManyToOne(() => Board, { onDelete: 'CASCADE'})
    @Column('varchar', { name: 'boardIdId', nullable: true })
    boardId!: string;

    @ManyToOne(() => ColumnEntity, { onDelete: 'CASCADE'})
    @Column('varchar', { name: 'columnIdId', nullable: true})
    columnId!: string;

    static toResponse = (task: Partial<Task>): Partial<Task> | undefined => task;
}