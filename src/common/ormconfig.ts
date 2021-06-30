
import { ConnectionOptions } from 'typeorm';
// import dotenv from 'dotenv';
// import path from 'path';

/* dotenv.config({
  path: path.join(__dirname, '../../.env')
}); */


const configTypeorm: ConnectionOptions = {
    type: 'postgres',
    host: process.env['DB_HOST'],
    port: Number(process.env['POSTGRES_PORT']),
    username: process.env['POSTGRES_USER'],
    password: process.env['POSTGRES_PASSWORD'],
    database: process.env['POSTGRES_DB'],
    logging: process.env['DB_LOGGING'] === 'true',
    synchronize: process.env['DB_SYNC'] === 'true',
    entities: ['src/entities/**/*.ts'],
    migrations: ['src/migrations/*.ts'],
    cli: {
        entitiesDir: 'src/entities',
        migrationsDir: 'src/migrations',
    },
};

export default configTypeorm;