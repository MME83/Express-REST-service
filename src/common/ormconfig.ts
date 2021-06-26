/* eslint-disable dot-notation */
import { ConnectionOptions } from 'typeorm';

export const configTypeorm: ConnectionOptions = {
    type: 'postgres',
    host: process.env['DB_HOST'],
    port: Number(process.env['POSTGRES_PORT']),
    username: process.env['POSTGRES_USER'],
    password: process.env['POSTGRES_PASSWORD'],
    database: process.env['POSTGRES_DB'],
    entities: ['../../src/entities/**/*.ts'],
    logging: Boolean(process.env['DB_LOGGING']),
    synchronize: Boolean(process.env['DB_SYNC']),
    migrations: ['../../src/migrations/*.ts'],
    cli: {
        entitiesDir: '../../src/entities',
        migrationsDir: '../../src/migrations',
    },
};