import { /* ReasonPhrases, */ StatusCodes } from 'http-status-codes';
import express from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { User } from './user.model';
import usersService from './user.service';

const router = express.Router();

router.route('/').get(
  asyncHandler(async (_req, res) => {
    const users = await usersService.getAll();
    
    res.status(StatusCodes.OK).json(users.map(User.toResponse));
  })
);

router.route('/').post(
  asyncHandler(async (req, res) => {
    const user = await usersService.create(User.fromRequest(req.body));
    
    res.status(StatusCodes.CREATED).json(User.toResponse(user));
  })
);

router.route('/:id').get(
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    const user = await usersService.getById(String(id));

    res.status(StatusCodes.OK).json(User.toResponse(user));
  })
);

router.route('/:id').put(
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    const user = await usersService.update(String(id), req.body);
    
    if (user !== undefined)
    res.status(StatusCodes.OK).json(User.toResponse(user));     
  })
);

router.route('/:id').delete(
  asyncHandler(async (req, res) => {
    const { id } = req.params;
      await usersService.remove(String(id));

      res.status(StatusCodes.NO_CONTENT).send('User has been deleted');
  })
);

export default router;
