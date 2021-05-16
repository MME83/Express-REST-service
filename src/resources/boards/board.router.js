const router = require('express').Router();

// const Board = require('./board.model');
// const Column = require('./board.column.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
    const boards = await boardsService.getAll();
    res.status(200).json(boards);
});

router.route('/:id').get(async (req, res) => {
    const { id } = req.params;
    const board = await boardsService.getById(id);
    res.status(200).json(board);
});

router.route('/').post(async (req, res) => {
    const props = req.body; 
    const board = await boardsService.save(props);
    
    res.status(201).json(board);
});

router.route('/:id').delete(async (req, res) => {
    const { id } = req.params;
    await boardsService.remove(req.params.id);
    res.status(204).send(`Board ${id} has been removed`);
});

router.route('/:id').put(async (req, res) => {
    const { id } = req.params;
    const props = req.body;
    const board = await boardsService.update(
      id,
      props
    );
    res.status(200).json(board);
  });

module.exports = router;