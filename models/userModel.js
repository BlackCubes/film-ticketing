const mongoose = require('mongoose');
const validator = require('validator');

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
  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    minlength: [8, 'A password must be more than or equals to 8 characters!'],
    maxlength: [60, 'A password must be less than or equals to 60 characters!']
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

const User = mongoose.model('User', userSchema);

module.exports = User;
