import * as e from 'express';
import sio from 'socket.io';

import * as UserTypes from './user.types';

// **** JWT **** //
interface IDecodedJWT extends Pick<UserTypes.IUser, 'email' | 'name' | 'photo'> {
  id: string;
}

// **** EXPRESS **** //
interface IReq<T = void> extends e.Request {
  body: T;
}

interface IRes extends e.Response {}

interface IFile extends Express.Multer.File {}

// **** SOCKET **** //
interface ISocketClientToServerEvents {
  hello: () => void;
}

interface ISocketServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ISocketInterServerEvents {
  ping: () => void;
}

interface ISocketData {
  name: string;
  age: number;
}

type TSocketServer = sio.Server<
  ISocketClientToServerEvents,
  ISocketServerToClientEvents,
  ISocketInterServerEvents,
  ISocketData
>;

export { IDecodedJWT, IFile, IReq, IRes, TSocketServer };
