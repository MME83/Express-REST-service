const router = require('express').Router();
const User = require('./user.model');

const usersService = require('./user.service');
const routerErrorHandler = require('../../utils/routerErrorHandler');

router.route('/').get(
  routerErrorHandler(async (req, res) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
  
    res.status(200).json(users.map(User.toResponse));
  })
);

router.route('/').post(
  routerErrorHandler(async (req, res) => {
    const { name, login, password } = req.body;

    const user = await usersService.create({ name, login, password });
    res.status(201).json(User.toResponse(user));    
  })
);

router.route('/:id').get(
  routerErrorHandler(async (req, res) => {
    const { id } = req.params;

    const user = await usersService.getById(id);

    res.status(200).json(User.toResponse(user));  
  })
);

router.route('/:id').put(
  routerErrorHandler(async (req, res) => {
    const { id } = req.params;
    const { name, login, password } = req.body;

    const user = await usersService.update(
      id,
      { name, login, password }
    );
    
    res.status(200).json(User.toResponse(user));
  })
);

router.route('/:id').delete(
  routerErrorHandler(async (req, res) => {
    const { id } = req.params;

    await usersService.remove(id);
    
    res.status(204).send('User has been deleted');
  })
);

module.exports = router;
