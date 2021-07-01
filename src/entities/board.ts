import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ColumnEntity } from './column';
import { Task } from "./task";

export interface IBoard {
    id: string;
    title: string;
    columns: ColumnEntity[];
}

@Entity({ name: 'boards' })
export class Board {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('varchar', { length: 255, default: 'Board_title' })
    title!: string;

    @OneToMany(() => ColumnEntity, column => column.board, {
       cascade: true,
       eager: true,
    })
    columns!: ColumnEntity[];

    @OneToMany(() => Task, task => task.boardId, { 
        cascade: true
    })
    tasks!: Task[];
}