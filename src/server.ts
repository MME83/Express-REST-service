import 'reflect-metadata';
// import { createConnection } from 'typeorm';
import config from './common/config';
// import configTypeorm from './common/ormconfig';
import app from './app';
import { logger } from './logger/logger';
import { dbCreateConnection } from './common/dbCreateCOnnection';

/*
createConnection(configTypeorm)
  .then(async connection => {
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
  .catch((error: Error) => {
    console.log(`Fail connect to DB: `, error.message);
    logger.error({
      message: `Caught exception ${error} Exception from server.ts\n`,
    });
    logger.exitOnError = true;
});
*/

const start = async () => {
  await dbCreateConnection();

  app.listen(config.PORT, () => {
    process.stdout.write(`App is running on http://localhost:${config.PORT}\n`);
    logger.info(`App is running on http://localhost:${config.PORT}\n`);
  });
};

start().catch(console.error);
