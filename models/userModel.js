const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name!'],
    minLength: [2, 'Please enter a name a minimum of 2 characters!'],
    maxLength: [70, 'Please enter a name less than 70 characters!']
  },
  email: {
    type: String,
    required: [true, 'Please enter your email!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email!']
  },
  username: {
    type: String,
    required: [true, 'Please enter your username!'],
    minLength: [3, 'Please enter a username a minimum of 3 characters!'],
    maxLength: [9, 'Please enter a username less than 9 characters!'],
    unique: true,
    lowercase: true
  },
  photo: { type: String, default: 'default.jpg' },
  role: {
    type: String,
    enum: ['user', 'event-owner', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    minlength: [8, 'A password must be more than or equals to 8 characters!'],
    maxlength: [60, 'A password must be less than or equals to 60 characters!'],
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password!'],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: 'The passwords are not the same!'
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  birthdate: {
    type: Date,
    required: [true, 'Please provide your birthdate!']
    //validate: [validator.isDate, 'Please provide a valid birthday!']
  },
  gender: {
    type: String,
    required: [true, 'Please provide an answer to gender!'],
    enum: {
      values: ['f', 'm', 'p'],
      message:
        'Give the correct values for gender! Acceptable are: Female, Male, or Prefer not to say.'
    }
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

// DOCUMENT MIDDLEWARES
// SALT PASSWORD
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

// QUERY MIDDLEWARES
// SHOW USER(S) THAT ARE ACTIVE
userSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});

// UPDATE THE DATE IF PASSWORD IS CHANGED
userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// INSTANCE METHODS
// CHECK FOR CORRECT PASSWORD
userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// CHECK FOR CHANGED PASSWORD AFTER TOKEN ISSUED
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

// CREATE USER PASSWORD RESET
userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
