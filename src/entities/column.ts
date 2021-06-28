import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Board, IBoard } from "./board";

export interface IColumn {
    id: string;
    title: string;
    order: number;
    board: IBoard;
}

@Entity({ name: 'columns' })
export class ColumnEntity implements IColumn {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('varchar', { length: 255, default: 'Column_title' })
    title!: string;

    @Column('int', { default: 0 })
    order!: number;

    @ManyToOne(() => Board, board => board.columns)
    @JoinColumn({ name: 'board_id' })
    board!: Board;
}
