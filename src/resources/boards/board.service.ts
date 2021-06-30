/**
 * Board service
 * @module board/service
 */
import boardsRepository from './board.repository';
import { Board, IBoard } from '../../entities/board';

// import tasksService from '../tasks/task.service';

const getAll = (): Promise<Array<IBoard>> => boardsRepository.getAll();

const getBoardById = (id: string): Promise<IBoard | undefined> => boardsRepository.getBoardById(id);

const createBoard = (props: Omit<Board, 'id'>): Promise<IBoard | undefined> => boardsRepository.createBoard(props);

const updateBoard = (id: string, props: Partial<Board>): Promise<IBoard | undefined> => 
boardsRepository.updateBoard(id, props);

const deleteBoardById = async (id: string): Promise<void> => 
   // await tasksService.delTaskByBoardId(id);
     boardsRepository.deleteBoardById(id);

export default {
    getAll,
    createBoard,
    getBoardById,
    updateBoard,
    deleteBoardById,
};