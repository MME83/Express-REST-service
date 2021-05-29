const router = require('express').Router();
const boardsService = require('./board.service');
const routerErrorHandler = require('../../utils/routerErrorHandler');

router.route('/').get(
    routerErrorHandler(async (req, res) => {
      const boards = await boardsService.getAll();

      res.status(200).json(boards);
    })
);

router.route('/').post(
    routerErrorHandler(async (req, res) => {
      const props = req.body; 
      const board = await boardsService.create(props);
    
      res.status(201).json(board);
    })
);

router.route('/:id').get(
    routerErrorHandler(async (req, res) => {
      const { id } = req.params;
      const board = await boardsService.getById(id);

      res.status(200).json(board);
    })
);

router.route('/:id').put(
    routerErrorHandler(async (req, res) => {
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
    routerErrorHandler(async (req, res) => {
      const { id } = req.params;
     
      await boardsService.remove(req.params.id);
     
      res.status(204).send(`Board with id:${id} has been removed`);
    })
);

module.exports = router;