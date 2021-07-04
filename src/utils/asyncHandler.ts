import { Request, Response, NextFunction, RequestHandler } from "express";

/**
 * function wrapper
 * route handlers and middleware that return a Promise 
 * will call next(value) automatically when they reject or throw an error
 */

 export const asyncHandler = (fn: RequestHandler) => 
  
   (req: Request, res: Response, next: NextFunction): any => 
     Promise.resolve(fn(req, res, next)).catch((error) => {
       next(error)
     });