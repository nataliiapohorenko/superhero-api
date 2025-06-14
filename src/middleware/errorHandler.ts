import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  console.error(chalk.red.bold(`[ERROR] ${req.method} ${req.originalUrl}`));
  console.error(chalk.red(`→ Status: ${status}`));
  console.error(chalk.red(`→ Message: ${message}`));
  if (process.env.NODE_ENV === 'development') {
    console.error(chalk.gray(err.stack));
  }

  res.status(status).json({
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
