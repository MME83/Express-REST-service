import {ReasonPhrases, StatusCodes} from 'http-status-codes';
import express from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { Task } from './task.model';
import tasksService from './task.service';


const router = express.Router({ mergeParams: true });

router.route('/').get(
    asyncHandler(async (req, res) => {
      const { boardId } = req.params;
      const tasks = await tasksService.getAll(String(boardId));
      
      if (tasks) {
        return res.status(StatusCodes.OK).json(tasks.map(Task.toResponse)); 
      }
      return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    })
);

router.route('/').post(
  asyncHandler(async (req, res) => {
      const { boardId } = req.params;     
      const task = await tasksService.create(new Task({ ...req.body, boardId }));
      
      if (task) {
        return res.status(StatusCodes.CREATED).json(Task.toResponse(task));
      }
      return res.status(StatusCodes.CREATED).json(Task.toResponse(task));
    })
);

router.route('/:id').get(
    asyncHandler(async (req, res) => { 
      const { id } = req.params;   
      const task = await tasksService.getById(String(id));
      
      if (task) {
        return res.status(StatusCodes.OK).json(Task.toResponse(task));
      }
      return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    })
);

router.route('/:id').put(
    asyncHandler(async (req, res) => {
      const { id } = req.params;

      const updatedTask = await tasksService.update(
        String(id),
        req.body
      );
      
      if (updatedTask) {
        return res.status(200).json(Task.toResponse(updatedTask));
      }
      return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    })
);

router.route('/:id').delete(
    asyncHandler(async (req, res) => {
      const { id } = req.params;
      const task = await tasksService.getById(String(id));
      
      if (task) {
        await tasksService.remove(String(id));
        return res.status(StatusCodes.NO_CONTENT).send('Task has been removed!');
      }
      return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    })
);

export default router;