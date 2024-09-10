import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import validator from 'validator';
import { errorConstants as userErrors } from '../constants';

export type UserDocument = HydratedDocument<User>;

// **** SCHEMA **** //
@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class User {
  @Prop({
    type: String,
    required: [true, userErrors.name.required],
    minlength: [2, userErrors.name.minLength],
    maxlength: [70, userErrors.name.maxLength],
  })
  name: string;

  @Prop({
    type: String,
    required: [true, userErrors.email.required],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, userErrors.email.valid],
  })
  email: string;

  @Prop({
    type: String,
    required: [true, userErrors.username.required],
    unique: true,
    minlength: [2, userErrors.username.minLength],
    maxlength: [20, userErrors.username.maxLength],
  })
  username: string;

  photo: string;

  @Prop({
    type: String,
    default: 'user',
    enum: {
      values: ['admin', 'event-owner', 'user'],
      message: userErrors.role.valid,
    },
  })
  role: string;

  @Prop({
    type: String,
    minlength: [8, userErrors.password.minLength],
    maxlength: [60, userErrors.password.maxLength],
    select: false,
  })
  password: string;

  @Prop({ type: Date })
  passwordChangedAt: Date;

  @Prop({ type: String })
  passwordResetToken: string;

  @Prop({ type: Date })
  passwordResetExpires: Date;

  @Prop({
    type: Date,
    required: [true, userErrors.birthdate.required],
  })
  birthdate: Date;

  @Prop({
    type: String,
    required: [true, userErrors.gender.required],
    enum: {
      values: ['f', 'm', 'p'],
      message: userErrors.gender.valid,
    },
  })
  gender: string;

  @Prop({
    type: Boolean,
    default: true,
    select: false,
  })
  isActive: boolean;

  async checkCorrectPassword(challengePassword: string): Promise<boolean> {
    return await bcrypt.compare(challengePassword, this.password);
  }

  changedPasswordAfter(JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimestamp = this.passwordChangedAt.getTime() / 1000;

      return JWTTimestamp < changedTimestamp;
    }

    return false;
  }

  createPasswordResetToken(expirationInMinutes: number): string {
    const token = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    this.passwordResetExpires = new Date(
      Date.now() + expirationInMinutes * 60 * 1000,
    );

    return token;
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.loadClass(User);
