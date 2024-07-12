import { IReq } from './misc';
import * as UserTypes from './user.types';

// **** LOGIN **** //
interface ILogin extends Pick<UserTypes.IUser, 'email' | 'password'> {}

interface ILoginReq extends IReq<ILogin> {}

interface ILoginRes extends Pick<UserTypes.IUser, 'id' | 'email' | 'username' | 'name' | 'photo'> {}

export { ILogin, ILoginReq, ILoginRes };
