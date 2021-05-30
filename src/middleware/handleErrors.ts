import express from 'express';
import GeneralError from '../utils/errors';
import NotFound from '../utils/notfound';
import BadRequest from '../utils/badrequest';

/**
 * Return known errors, forwards other errors with next()
 * @param {Object} err error object
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @param {Function} next Express next() method
 * @returns {JSON} error status code and error message
 */
const handleErrors = (
  err: { code?: number | string; message: string}, 
  _req: express.Request, 
  res: express.Response,
  next: express.NextFunction
): void => {
  if (err instanceof GeneralError) {
    res.status(500);
    res.json({ error : err.message });
  } if (err instanceof NotFound) {
    res.status(404);
    res.json({ error : err.message });
  }
  if (err instanceof BadRequest) {
    res.status(400);
    res.json({ error : err.message });
  }
  next();
  res.status(500);
  res.json({ error : err.message });

};

export default handleErrors;
