import { createConnection } from 'typeorm';
import config from './common/config';
import { configTypeorm } from './common/ormconfig';
import app from './app';
import { logger } from './logger/logger';

createConnection(configTypeorm)
  .then(async (connection) => {
    if (connection.isConnected) {
      process.stdout.write('DB connection has succeeded');
      logger.info({ message: 'DB connection has succeeded' });

      app.listen(config.PORT, () => {
        process.stdout.write(`App is running on http://localhost:${config.PORT}\n`);
        logger.info(`App is running on http://localhost:${config.PORT}\n`);
      });
    } else {
      connection.connect();
    }
  })
  .catch((error) => {
    logger.error({
      message: `Caught exception ${error} Exception from server.ts\n`,
    });
    logger.exitOnError = true;
  });
