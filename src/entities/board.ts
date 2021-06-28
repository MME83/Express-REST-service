import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ColumnEntity, IColumn } from './column';

export interface IBoard {
    id: string;
    title: string;
    columns: IColumn[];
}

@Entity({ name: 'boards' })
export class Board implements IBoard {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('varchar', { length: 255, default: 'Board_title' })
    title!: string;

    @OneToMany(() => ColumnEntity, column => column.board, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        cascade: true
    })
    columns!: ColumnEntity[];
}