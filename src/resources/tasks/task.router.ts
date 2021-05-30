import express from 'express';
import asyncHandler from 'express-async-handler';

import Task from './task.model';
import tasksService from './task.service';


const router = express.Router();

router.route('/:boardId/tasks').get(
    asyncHandler(async (req, res) => {
      const { boardId } = req.params;
      const tasks = await tasksService.getAll(boardId);
    
      res.status(200).json(tasks.map(Task.toResponse));
    })
);

router.route('/:boardId/tasks').post(
    asyncHandler(async (req, res) => {
      const { boardId } = req.params;
      const { body } = req;
      const task = await tasksService.create(boardId, body);

      res.status(201).json(Task.toResponse(task));
    })
);

router.route('/:boardId/tasks/:id').get(
    asyncHandler(async (req, res) => {
      const { boardId, id } = req.params;
      const task = await tasksService.getById(boardId, id);

      res.status(200).json(Task.toResponse(task));
    })
);

router.route('/:boardId/tasks/:id').put(
    asyncHandler(async (req, res) => {
      const { boardId, id } = req.params;
      const { body } = req;
      const updatedTask = await tasksService.update(
        boardId,
        id,
        body,
      );

      res.status(200).json(Task.toResponse(updatedTask));
    })
);

router.route('/:boardId/tasks/:id').delete(
    asyncHandler(async (req, res) => {
      const { boardId, id } = req.params;

      await tasksService.remove(boardId, id);

      res.status(204).send('Task has been removed!');
    })
);

module.exports = router;