/* eslint-disable dot-notation */
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

export default {
  PORT: process.env['PORT'],
  NODE_ENV: process.env['NODE_ENV'],
  JWT_SECRET_KEY: process.env['JWT_SECRET_KEY'],
  AUTH_MODE: process.env['AUTH_MODE'] === 'true',
}

/*
export const { PORT } = process.env;
export const { NODE_ENV } = process.env;
// export const { MONGO_CONNECTION_STRING } = process.env;
export const { JWT_SECRET_KEY } = process.env;
const { AUTH_MODE: authMode } = process.env;
export const AUTH_MODE = authMode === 'true';
*/