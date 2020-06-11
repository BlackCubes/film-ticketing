/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const updatePersonalData = async (name, birthdate, gender) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:3000/api/v1/users/updateMe',
      data: {
        name,
        birthdate,
        gender
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Your data has been updated!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
