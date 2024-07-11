import { Model, Schema, Types } from 'mongoose';

type TUserRole = 'user' | 'event-owner' | 'admin';

type TUserGender = 'f' | 'm' | 'p';

interface IUser {
  id: Types.ObjectId;
  name: string;
  email: string;
  username: string;
  photo?: string | null;
  role?: TUserRole | null;
  password: string;
  passwordChangedAt: number;
  passwordResetToken?: string;
  passwordResetExpires?: number;
  birthdate: Date;
  gender: TUserGender;
  isActive?: boolean | null;
  createdAt: Date;
  updatedAt: Date;
}

// **** MODEL **** //
interface IUserMethods {
  correctPassword(givenPassword: string | Buffer, userPassword: string): Promise<boolean>;
  createPasswordResetToken(expMin: number): string;
}

type TUserModel = Model<IUser, {}, IUserMethods, {}>;

type TUserSchema = Schema<IUser, TUserModel, IUserMethods, {}, {}>;

export { IUser, IUserMethods, TUserGender, TUserModel, TUserRole, TUserSchema };
