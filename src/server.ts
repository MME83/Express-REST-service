import "reflect-metadata";
import { /* Connection, */ createConnection } from 'typeorm';
import config from './common/config';
import configTypeorm from './common/ormconfig';
import app from './app';
import { logger } from './logger/logger';

console.log(configTypeorm);
createConnection(configTypeorm)
  .then(async (connection) => {
    if (connection.isConnected) {
      process.stdout.write('DB connection has succeeded\n');
      logger.info({ message: 'DB connection has succeeded\n' });

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
