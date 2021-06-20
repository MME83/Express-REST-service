/**
 * Board service
 * @module board/service
 */
import { Board } from './board.model';
import * as boardsRepo from './board.memory.repository';
import tasksService from '../tasks/task.service';

const getAll = (): Promise<Array<Board>> => boardsRepo.getAll();

const getById = (id: string): Promise<Board> => boardsRepo.getById(id);

const create = (props: Board): Promise<Board> => boardsRepo.create(props);

const update = (id: string, props: Partial<Board>): Promise<Board | undefined> => 
    boardsRepo.update(id, props);

const remove = (id: string): Promise<void> => {
    tasksService.removeAllOnBoard(id);
    return boardsRepo.remove(id);
    
};

export {
    getAll,
    getById,
    create,
    update,
    remove,
};