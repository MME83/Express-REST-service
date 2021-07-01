import express from 'express';
import {ReasonPhrases, StatusCodes} from 'http-status-codes';
import { asyncHandler } from '../../utils/asyncHandler';
import boardsService from './board.service';

const router = express.Router();

router.route('/').get(
    asyncHandler(async (_req, res) => {
      const boards = await boardsService.getAll();
      
      return res.status(StatusCodes.OK).json(boards);
    })
);

router.route('/').post(
    asyncHandler(async (req, res) => {
      const board = await boardsService.createBoard(req.body);
      
      if (!board) {
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      }

      return res.status(StatusCodes.CREATED).json(board);
    })
);

router.route('/:id').get(
    asyncHandler(async (req, res) => {
      const { id } = req.params;
      const board = await boardsService.getBoardById(id as string);
      
      if (!board) {
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      }
      
      return res.status(StatusCodes.OK).json(board); 
    })
);

router.route('/:id').put(
    asyncHandler(async (req, res) => {
      const { id } = req.params;      
      const board = await boardsService.updateBoard(String(id), req.body);
      
      return res.status(StatusCodes.OK).json(board);
    })
);

router.route('/:id').delete(
  asyncHandler(async (req, res) => {
      const { id } = req.params;
      const board = await boardsService.getBoardById(String(id));
     
      if (!board) {
        res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      }
     
      await boardsService.deleteBoardById(String(id));
      res.status(StatusCodes.NO_CONTENT).send(`Board with id:${id} has been removed`);
    })
);

export default router;