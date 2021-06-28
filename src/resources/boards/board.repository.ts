/**
 * Board repository
 * @module board/repository
 */

import { EntityRepository, Repository, getConnection } from 'typeorm'; 
import { Board, IBoard } from '../../entities/board';
import { ColumnEntity } from '../../entities/column';


@EntityRepository(Board)
class BoardsRepository extends Repository<Board> {
  getAll() {
    return this.createQueryBuilder('board')
      .leftJoinAndSelect('board.columns', 'columns')
      .getMany();
  }

  async createBoard({ title, columns }: Partial<IBoard>) {
    const board = new Board();

    const connnectionManager = getConnection().manager;

    if (board) {
      board.title = title || board.title || 'Board_title';

      await connnectionManager.save(board);

      if (columns) {
        await Promise.all(columns.map(async ({ id: columnId, title: columnTitle, order }) => {
          const column = new ColumnEntity();
          column.id = columnId;
          column.title = columnTitle;
          column.order = order;
          column.board = board;
          await connnectionManager.save(column);
        }))
      }
    }

    return this.getBoardById(board.id);
  }

  async getBoardById(id: string) {
    return this.createQueryBuilder('board')
      .leftJoinAndSelect('board.columns', 'columns')
      .where('board.id = :id', { id })
      .getOne();
  }

  async updateBoard(id :string, { title, columns }: Partial<IBoard>) {
    await this.createQueryBuilder()
      .update(Board)
      .set({ title, columns })
      .where('boardId = :boardId', { id })
      .execute();

    return this.getBoardById(id);
  }

  async deleteBoardById(id: string) {
    return this.createQueryBuilder()
      .delete()
      .from(Board)
      .where('id = :id', { id })
      .execute();
  }
}

export const boardsRepository = getConnection().getCustomRepository(BoardsRepository);
