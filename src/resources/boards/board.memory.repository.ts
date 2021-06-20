/**
 * Board repository
 * @module board/repository
 */

import memoryDb from '../../memoryDB/memoryDb';
import NotFound from '../../utils/notfound';
import BadRequest from '../../utils/badrequest';
import { Board } from './board.model';
import { Column } from './board.column.model'

const boardDB: Board[] = memoryDb.Boards;

const getAll = async (): Promise<Board[]> => {
  const boards = boardDB.filter((entity) => entity);

  return boards;
}

const getById = async (id: string): Promise<Board> => {
  const board = boardDB.find((item) => item.id === id);   
  
  if (!board) {
    throw new NotFound(`Board with id:${id} not found`);
  }

  return board;
};

const create = async (board: Board): Promise<Board> => {
  const newBoard = boardDB.push(board);

  if (!newBoard) {
    throw new BadRequest(`Board has not created`);
  }
  
  return getById(board.id);
};

const update = async (id: string, props: Partial<Board>): Promise<Board | undefined> => {
  const board = await getById(id);

  if (!board) {
    throw new NotFound(`Board with id:${id} not found`);
  }
  const columns = props.columns?.map((column) => new Column(column));
  const dataToUpdate = columns ? { ...props, columns } : props;
  const IndexBoard = boardDB.indexOf(board);

  boardDB[IndexBoard] = ({ ...board, ...dataToUpdate});

  return boardDB[IndexBoard];
  
  // if (board.columns.id
  // const columns = props.columns?.map((column) => new Column(column));
  // const dataToUpdate = columns ? { ...props, columns } : props;
  
  /* board.title = props.title ? props.title : board.title;
  board.columns = props.columns ? ([ ...board.columns, ...props.columns]) : board.columns;

  return board; */
/*
  const columns = props.columns?.map((column) => new Column(column));
  const dataToUpdate = columns ? { ...props, columns } : props;
  
  board = ({ ...board, ...dataToUpdate});

  return board; */
};

const remove = async (id: string): Promise<void> => {
  boardDB.map((board, idx) => {
    if (board.id === id) {
      boardDB.splice(idx, 1);     
      return true;
    }
    
    return false;
  })
};

export { getAll, getById, create, update, remove };