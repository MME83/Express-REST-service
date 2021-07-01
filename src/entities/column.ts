import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { Board } from "./board";
import { Task } from "./task";

export interface IColumn {
    id: string;
    title: string;
    order: number;
}

@Entity({ name: 'columns' })
export class ColumnEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('varchar', { length: 255, default: 'Column_title' })
    title!: string;

    @Column('int', { default: 0 })
    order!: number;

    @ManyToOne(() => Board, board => board.columns, {
        onDelete: 'CASCADE',
    })
    board!: Board;

    @OneToMany(() => Task, task => task.columnId, { cascade: true })
    tasks!: Task[];
}
