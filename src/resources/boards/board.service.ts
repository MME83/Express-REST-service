/**
 * Board service
 * @module board/service
 */
import { DeleteResult } from 'typeorm';
import { Board } from '../../entities/board';
import { boardsRepository } from './board.repository';
import tasksService from '../tasks/task.service';

const getAll = (): Promise<Array<Board>> => boardsRepository.getAll();

const getBoardById = (id: string): Promise<Board | undefined> => boardsRepository.getBoardById(id);

const createBoard = (props: Board): Promise<Board | undefined> => boardsRepository.createBoard(props);

const updateBoard = (id: string, props: Partial<Board>): Promise<Board | undefined> => 
boardsRepository.updateBoard(id, props);

const deleteBoardById = async (id: string): Promise<DeleteResult> => {
    await tasksService.delTaskByBoardId(id);
    return boardsRepository.deleteBoardById(id);
    
};

export default {
    getAll,
    createBoard,
    getBoardById,
    updateBoard,
    deleteBoardById,
};