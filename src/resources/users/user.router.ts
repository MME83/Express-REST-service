import express from 'express';
import { StatusCodes } from 'http-status-codes';
import usersService from './user.service';
import { asyncHandler } from '../../utils/asyncHandler';
import NotFound from '../../utils/notfound';
import BadRequest from '../../utils/badrequest';
import { User } from '../../entities/user'

const router = express.Router();

router.route('/').get(
  asyncHandler(async (_req, res) => {
    const users = await usersService.getAll();
    
    if (!users) {
      throw new NotFound(`Users not found`);
    }

    res.status(StatusCodes.OK).json(users);
  })
);

router.route('/').post(
  asyncHandler(async (req, res) => {
    const user = await usersService.createUser(req.body);
    
    if (!user) {
      throw new BadRequest(`User has not created`);
    }

    res.status(StatusCodes.CREATED).json(User.toResponse(user));
  })
);

router.route('/:id').get(
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    const user = await usersService.getUserById(String(id));

    res.status(StatusCodes.OK).json(user);
  })
);

router.route('/:id').put(
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    const user = await usersService.updateUser(String(id), req.body);
    
    if (!user) {
      throw new BadRequest(`User with id:${id} not exist`);
    }
    
    res.status(StatusCodes.OK).json(user);     
  })
);

router.route('/:id').delete(
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    await usersService.deleteUserById(String(id));

    res.status(StatusCodes.NO_CONTENT).send('User has been deleted');
  })
);

export default router;
