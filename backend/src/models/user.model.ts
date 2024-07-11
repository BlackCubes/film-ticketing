import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

import ErrorMessages from '@src/constants/ErrorMessages';
import * as UserTypes from '@src/types/user.types';
import * as regex from '@src/util/regex';

const SALT_WORK_FACTOR = 10;

// **** SCHEMA **** //
const schema: UserTypes.TUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, ErrorMessages.userErrors.name.required],
      maxlength: [70, ErrorMessages.userErrors.name.maxLength],
      minlength: [70, ErrorMessages.userErrors.name.minLength],
    },

    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, ErrorMessages.userErrors.email.required],
      validate: [validator.isEmail, ErrorMessages.userErrors.email.valid],
    },

    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, ErrorMessages.userErrors.username.required],
      maxlength: [20, ErrorMessages.userErrors.username.maxLength],
      minlength: [2, ErrorMessages.userErrors.username.minLength],
    },

    photo: String,

    role: {
      type: String,
      default: 'user',
      enum: {
        values: regex.userRole,
        message: ErrorMessages.userErrors.role.valid,
      },
    },

    password: {
      type: String,
      default: null,
      select: false,
      maxlength: [60, ErrorMessages.userErrors.password.maxLength],
      minlength: [8, ErrorMessages.userErrors.password.minLength],
    },

    passwordChangedAt: Date,

    passwordResetToken: String,

    passwordResetExpires: Date,

    birthdate: {
      type: Date,
      required: [true, ErrorMessages.userErrors.birthdate.required],
    },

    gender: {
      type: String,
      required: [true, ErrorMessages.userErrors.gender.required],
      enum: {
        values: regex.userGender,
        message: ErrorMessages.userErrors.gender.valid,
      },
    },

    isActive: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// DOCUMENT MIDDLEWARES
// --- salt password
// Using non-arrow function since it has access to the `User` model with `this`
schema.pre('save', async function (next) {
  // Only hash the password if it has been modified or new
  if (!this.isModified('password')) {
    return next();
  }

  // If it is undefined for whatever reason
  if (!this.password) {
    return next();
  }

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;

  return next();
});

// --- update the date if the password changed
schema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// INSTANCE METHODS
// --- check for correct password
schema.methods.correctPassword = async function (givenPassword, userPassword) {
  return await bcrypt.compare(givenPassword, userPassword);
};

// --- create password reset
schema.methods.createPasswordResetToken = function (expMin) {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  this.passwordResetExpires = Date.now() + expMin * 60 * 1000;

  return resetToken;
};

export default mongoose.model('User', schema);
