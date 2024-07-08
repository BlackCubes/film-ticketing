import { Model, Types } from 'mongoose';

interface IUser {
  id: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  password: string;
  passwordChangedAt: number;
  passwordResetToken?: string;
  passwordResetExpires?: string;
}

// **** MODEL **** //
interface IUserMethods {
  correctPassword(givenPassword: string | Buffer, userPassword: string): Promise<boolean>;
  createPasswordResetToken(expMin: number): string;
}

type TUserModel = Model<IUser, {}, IUserMethods, {}>;

export { IUser, IUserMethods, TUserModel };
