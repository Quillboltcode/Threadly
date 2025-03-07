import { Express, Request, Response, NextFunction } from "express";
// https://stackoverflow.com/questions/51391080/handling-errors-in-express-async-middleware
// async middlewares, that will call next(err) if the promise is rejected, reaching the express error handler and avoiding UnhandledPromiseRejectionWarning
export const asyncHandler = <T>(fn: (req: Request, res: Response, next: NextFunction) => Promise<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};