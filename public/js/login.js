/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/login',
      data: {
        email,
        password
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Welcome back!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/v1/users/logout'
    });

    if (res.data.status === 'success') location.reload(true); // Check the deprecated reload
  } catch (err) {
    showAlert('error', 'Error logging out! Please try again.');
  }
};

export const register = async (
  email,
  username,
  password,
  passwordConfirm,
  name,
  birthdate,
  gender
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/signup',
      data: {
        email,
        username,
        password,
        passwordConfirm,
        name,
        birthdate,
        gender
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Welcome to the club!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const forgotPassword = async email => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/forgotPassword',
      data: { email }
    });

    if (res.data.status === 'success') {
      showAlert(
        'success',
        'A password reset link has been sent to your email!'
      );
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
