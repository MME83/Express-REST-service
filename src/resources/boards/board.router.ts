import express from 'express';
import asyncHandler from 'express-async-handler';

import boardsService from './board.service';

const router = express.Router();

router.route('/').get(
    asyncHandler(async (req, res) => {
      const boards = await boardsService.getAll();

      res.status(200).json(boards);
    })
);

router.route('/').post(
    asyncHandler(async (req, res) => {
      const props = req.body; 
      const board = await boardsService.create(props);
    
      res.status(201).json(board);
    })
);

router.route('/:id').get(
    asyncHandler(async (req, res) => {
      const { id } = req.params;
      const board = await boardsService.getById(id);

      res.status(200).json(board);
    })
);

router.route('/:id').put(
    asyncHandler(async (req, res) => {
      const { id } = req.params;
      const props = req.body;
      const board = await boardsService.update(
        id,
        props
      );

      res.status(200).json(board);
    })
);

router.route('/:id').delete(
  asyncHandler(async (req, res) => {
      const { id } = req.params;
     
      await boardsService.remove(req.params.id);
     
      res.status(204).send(`Board with id:${id} has been removed`);
    })
);

export default router;