import 'reflect-metadata';
import express, { json, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors'; // handle error async for express
import routes from './routes';

import './database';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

const app = express();

app.use(cors());
app.use(json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response
        .status(err.statusCode)
        .json({ status: 'error', message: err.message });
    }

    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error.',
    });
  },
);

app.listen(3333, () => {
  console.log('Server Started');
});
