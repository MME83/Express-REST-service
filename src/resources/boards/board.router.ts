import {ReasonPhrases, StatusCodes} from 'http-status-codes';
import express from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { Board } from './board.model';
import * as boardsService from './board.service';

const router = express.Router();

router.route('/').get(
    asyncHandler(async (_req, res) => {
      const boards = await boardsService.getAll();
      
      return res.status(StatusCodes.OK).json(boards.map(Board.toResponse));
    })
);

router.route('/').post(
    asyncHandler(async (req, res) => {
      const board = await boardsService.create(new Board(req.body));
      
      return res.status(StatusCodes.CREATED).json(Board.toResponse(board));
    })
);

router.route('/:id').get(
    asyncHandler(async (req, res) => {
      const { id } = req.params;
      const board = await boardsService.getById(id as string);
      
      if (!board) {
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      }
      
      return res.status(StatusCodes.OK).json(Board.toResponse(board)); 
    })
);

router.route('/:id').put(
    asyncHandler(async (req, res) => {
      const { id } = req.params;      
      const board = await boardsService.update(String(id), req.body);
      
      if (!board) {
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);        
      }
      return res.status(StatusCodes.OK).json(Board.toResponse(board));
    })
);

router.route('/:id').delete(
  asyncHandler(async (req, res) => {
      const { id } = req.params;
     // const board = await boardsService.getById(String(id));
     
    /*  if (!board) {
        res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      } */
     
      await boardsService.remove(id as string);
      res.status(StatusCodes.NO_CONTENT).send(`Board with id:${id} has been removed`);
      // res.status(204).send(`Board with id:${id} has been removed`);
    })
);

export default router;