const router = require('express').Router();

const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/:boardId/tasks').get(async (req, res) => {
    const { boardId } = req.params;
    const tasks = await tasksService.getAll(boardId);
    
    res.status(200).json(tasks.map(Task.toResponse));
});

router.route('/:boardId/tasks/:id').get(async (req, res) => {
    const { boardId, id } = req.params;
    const task = await tasksService.getById(boardId, id);

    res.status(200).json(Task.toResponse(task));
});

router.route('/:boardId/tasks').post(async (req, res) => {
    const { boardId } = req.params;
    const { body } = req;
    const task = await tasksService.save(boardId, body);

    res.status(201).json(Task.toResponse(task));
});

router.route('/:boardId/tasks/:id').delete(async (req, res) => {
    const { boardId, id } = req.params;

    await tasksService.remove(boardId, id);
    res.status(204).send('Task has been removed!');
});

router.route('/:boardId/tasks/:id').put(async (req, res) => {
    const { boardId, id } = req.params;
    const { body } = req;
    const updatedTask = await tasksService.update(
      boardId,
      id,
      body,
    );

    res.status(200).json(Task.toResponse(updatedTask));
});

module.exports = router;