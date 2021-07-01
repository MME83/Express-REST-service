import { Request, Response, NextFunction } from 'express';
import NotFound from '../utils/notfound';
import BadRequest from '../utils/badrequest';
import { logErrors } from '../logger/logger';


/**
 * Return known errors, forwards other errors with next()
 * @param {Object} err error object
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @param {Function} next Express next() method
 * @returns {JSON} error status code and error message
 */
const handleErrors = (
  err: Error, 
  req: Request, 
  res: Response,
  next: NextFunction
): void => { 
  logErrors(err, req, res, next);
  if (err instanceof NotFound) {
    res.status(404).send(err.message);
  } else if (err instanceof BadRequest) {
    res.status(400);
    res.json({ error : err.message });
  } else {
    res.status(500).send(err.message);
  }
  next();
};

export default handleErrors;
