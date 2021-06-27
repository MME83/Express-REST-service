import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export interface ITask {
    id: string;
    title: string;
    order: number;
    description: string;
    userId: string | null;
    boardId: string | null;
    columnId: string | null;
}

@Entity({ name: 'tasks' })
export class Task implements ITask {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('varchar', { length: 255, default: 'Task_title' })
    title!: string;

    @Column('int', { default: 0 })
    order!: number;

    @Column('varchar', { length: 255, default: 'Task_description' })
    description!: string;

    @Column('varchar', { length: 255, default: null, nullable: true})
    userId!: string | null;

    @Column('varchar', { length: 255, default: null, nullable: true })
    boardId!: string | null;

    @Column('varchar', { length: 255, default: null, nullable: true})
    columnId!: string | null;
}