import 'dotenv/config';
import express, { Request } from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import sio from 'socket.io';

import environment from '@src/constants/environment';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { AppError } from '@src/other/classes';
import * as MiscTypes from '@src/types/misc';
import globalErrorHandler from '@src/util/global-error-handler.util';

const app = express();
const port = environment.Port;

// DB setup
const DB = environment.Db?.replace('<password>', environment.DbPass) ?? '';
mongoose.connect(DB);
mongoose.connection.on('connected', () => {
  console.log('Connected to the Kinetotickets database 🎥!');
});
mongoose.connection.on('error', (err) => {
  console.log(`Database error: ${err}`);
});

// Slim response size
app.use(compression());

// Security
app.use(helmet());

const originWhitelist = environment.NodeEnv === 'development' ? '*' : ['*'];
app.use(
  cors({ origin: '*', preflightContinue: true, credentials: true, methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] })
);

app.use(morgan('dev'));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(environment.Jwt.Secret));

const server = http.createServer(app).listen(port, '0.0.0.0', undefined, () => {
  console.log(`App running on port ${port} 📡...`);
});

// Sockets
const io = new sio.Server<MiscTypes.TSocketServer>(server, {
  cors: {
    origin: '*',
  },
});

app.get('/', (req, res) => {
  res.sendStatus(HttpStatusCodes.OK);
});

// Routes

// Errors
// --- unknown routes
app.all('*', (req: Request, res, next) =>
  next(new AppError(HttpStatusCodes.NOT_FOUND, `Could not find ${req.originalUrl} on this server!`))
);

// -- global errors
app.use(globalErrorHandler);

export default app;
