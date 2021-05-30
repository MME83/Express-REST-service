import express from 'express';
import asyncHandler from 'express-async-handler';
import User from './user.model';
import usersService from './user.service';

const router = express.Router();

router.route('/').get(
  asyncHandler(async (_req, res) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
  
    res.status(200).json(users.map(User.toResponse));
  })
);

router.route('/').post(
  asyncHandler(async (req, res) => {
    const { name, login, password } = req.body;

    const user = await usersService.create({ name, login, password });
    res.status(201).json(User.toResponse(user));    
  })
);

router.route('/:id').get(
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await usersService.getById(id);

    res.status(200).json(User.toResponse(user));  
  })
);

router.route('/:id').put(
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, login, password } = req.body;

    const user = await usersService.update(id, { name, login, password });
    
    res.status(200).json(User.toResponse(user));
  })
);

router.route('/:id').delete(
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    await usersService.remove(id);
    
    res.status(204).send('User has been deleted');
  })
);

export default router;
