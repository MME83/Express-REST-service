import { Connection, createConnection } from 'typeorm';
import config from './ormconfig';
import { logger } from '../logger/logger';

export const dbCreateConnection = async (): Promise<Connection | null> => {
  try {
    const conn = await createConnection(config);
    process.stdout.write(`Database connection success. Connection name: '${conn.name}' Database: '${conn.options.database}'\n`);
    logger.info({ message: `Database connection success. Connection name: '${conn.name}' Database: '${conn.options.database}'\n` });
  } catch (err) {
    process.stderr.write(`Fail connect to DB: `, err.message);
    logger.error({
      message: `Caught exception ${err} Exception from server.ts\n`,
    });
  }
  return null;
};