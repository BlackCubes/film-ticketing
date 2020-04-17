const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name!']
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
    unique: true,
    lowercase: true
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'event-owner', 'theater', 'admin'],
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
  birthdate: {
    type: Date,
    required: [true, 'Please provide your birthdate!']
    //validate: [validator.isDate, 'Please provide a valid birthday!']
  },
  gender: {
    type: String,
    required: [true, 'Please provide an answer to gender!'],
    enum: {
      values: ['Female', 'Male', 'Prefer not to say'],
      message:
        'Give the correct values for gender! Acceptable are: Female, Male, or Prefer not to say.'
    }
  }
});

// DOCUMENT MIDDLEWARE TO SALT PASSWORD
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

// INSTANCE METHOD TO CHECK FOR CORRECT PASSWORD
userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// INSTANCE METHOD TO CHECK FOR CHANGED PASSWORD AFTER TOKEN ISSUED
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

const User = mongoose.model('User', userSchema);

module.exports = User;
