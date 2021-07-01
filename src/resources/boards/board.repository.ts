/**
 * Board repository
 * @module board/repository
 */

import { getRepository } from 'typeorm'; 
import { Board, IBoard } from '../../entities/board';
import NotFound from '../../utils/notfound';

const getAll = async (): Promise<IBoard[]> => getRepository(Board).find();

const getBoardById = async (boardId: string): Promise<IBoard> => {
  const board = await getRepository(Board).findOne({ id: boardId });
  
  if (!board) {
    throw new NotFound(`Board with id:${boardId} has not found`);
  }
  
  return board;
};

const createBoard = async (props: Omit<Board, 'id'>): Promise<IBoard> => {
  
 /*  const { identifiers } = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Board)
    .values([{ ...props }])
    .execute();
  return getBoardById(identifiers?.[0]?.['id']);  */
  
  const board = getRepository(Board).create(props);
  const res = await getRepository(Board).save(board);
  return res;
};

const updateBoard = async (id: string, props: Partial<Board>): Promise<IBoard> => {
 
 /* await getConnection().createQueryBuilder()
    .update(Board)
    .set(props)
    .where('id = :id', { id })
    .execute();
  
  return getBoardById(id); */

  const result = await getBoardById(id);

  return result && getRepository(Board).save({ ...result, ...props });
};

const deleteBoardById = async (id: string): Promise<void> => {
  await getRepository(Board).createQueryBuilder()
    .delete()
    .from(Board)
    .where('id = :id', { id })
    .execute();
};

export default {
  getAll,
  createBoard,
  getBoardById,
  updateBoard,
  deleteBoardById
}
