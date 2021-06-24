import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';

import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import handleErrors from './middleware/handleErrors';
import { logger, logRequest } from './logger/logger';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use(logRequest);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);
app.use(handleErrors);

process.on('uncaughtException', (error) => {
  logger.error(`captured error: ${error.message}`, error);
  setTimeout(() => {process.exit(1);}, 100);
});

process.on('unhandledRejection', (reason) => {
  logger.error(`captured error ${reason}`);
  setTimeout(() => {process.exit(1);}, 100);
});

// uncomment error
// throw Error('Oops!');
// Promise.reject(Error('Oops!'));

export default app;
