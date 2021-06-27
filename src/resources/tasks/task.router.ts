import {ReasonPhrases, StatusCodes} from 'http-status-codes';
import express from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import tasksService from './task.service';


const router = express.Router({ mergeParams: true });

router.route('/').get(
    asyncHandler(async (req, res) => {
      const { boardId } = req.params;
      const tasks = await tasksService.getAll(String(boardId));
      
      if (!tasks) {
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);         
      }

      return res.status(StatusCodes.OK).json(tasks);
    })
);

router.route('/').post(
  asyncHandler(async (req, res) => {
      const { boardId } = req.params;     
      const task = await tasksService.createTask(String(boardId), req.body);
      
      if (task) {
        return res.status(StatusCodes.CREATED).json(task);
      }

      return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    })
);

router.route('/:id').get(
    asyncHandler(async (req, res) => { 
      const { boardId, id } = req.params;   
      const task = await tasksService.getTaskById(String(boardId), String(id));
      
      if (task) {
        return res.status(StatusCodes.OK).json(task);
      }

      return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    })
);

router.route('/:id').put(
    asyncHandler(async (req, res) => {
      const { boardId, id } = req.params;

      const updatedTask = await tasksService.updateTask(
        String(boardId),
        String(id),
        req.body
      );
      
      if (updatedTask) {
        return res.status(StatusCodes.OK).json(updatedTask);
      }
      return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    })
);

router.route('/:id').delete(
    asyncHandler(async (req, res) => {
      const { boardId, id } = req.params;
      const task = await tasksService.getTaskById(String(boardId), String(id));
      
      if (task) {
        await tasksService.deleteTaskById(String(boardId), String(id));
        return res.status(StatusCodes.NO_CONTENT).send('Task has been removed!');
      }
      
      return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    })
);

export default router;