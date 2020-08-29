/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const updateSettings = async (data, type, photoParams = '') => {
  try {
    let url =
      type === 'password'
        ? 'http://127.0.0.1:3000/api/v1/users/updateMyPassword'
        : 'http://127.0.0.1:3000/api/v1/users/updateMe';

    url =
      photoParams === ''
        ? url
        : `http://127.0.0.1:3000/api/v1/users/updateMe/${photoParams}`;

    const res = await axios({
      method: 'PATCH',
      url,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', `Your ${type} has been updated!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

// THINK ABOUT HOW TO IMPLEMENT ADMIN!
export const updateShowSettings = async (
  data,
  message,
  showId,
  roleType,
  posterParams = null
) => {
  try {
    const urlSub =
      roleType === 'admin' ? `${showId}` : `updateMyShow/${showId}`;

    const url =
      posterParams === null
        ? `http://127.0.0.1:3000/api/v1/shows/${urlSub}`
        : `http://127.0.0.1:3000/api/v1/shows/${urlSub}/${posterParams}`;

    const res = await axios({
      method: 'PATCH',
      url,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', `Your show's ${message} has been updated!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const updateReviewSettings = async (data, showId, showTitle) => {
  try {
    const url = `http://127.0.0.1:3000/api/v1/reviews/updateMyReview/${showId}`;

    const res = await axios({
      method: 'PATCH',
      url,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', `Your review for ${showTitle} has been updated!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const updateTheaterSettings = async (
  data,
  message,
  theaterId,
  photoParams = null
) => {
  try {
    const url =
      photoParams === null
        ? `http://127.0.0.1:3000/api/v1/theaters/${theaterId}`
        : `http://127.0.0.1:3000/api/v1/theaters/${theaterId}/${photoParams}`;

    const res = await axios({
      method: 'PATCH',
      url,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', `Your theater's ${message} has been updated!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const updateShowtimeSettings = async (data, message, showtimeId) => {
  try {
    const url = `http://127.0.0.1:3000/api/v1/showtimes/${showtimeId}`;

    const res = await axios({
      method: 'PATCH',
      url,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', `Your showtime's ${message} has been updated!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const updateCastCrewSettings = async (
  data,
  message,
  castcrewId,
  photoParams = null
) => {
  try {
    const url =
      photoParams === null
        ? `http://127.0.0.1:3000/api/v1/castcrews/${castcrewId}`
        : `http://127.0.0.1:3000/api/v1/castcrews/${castcrewId}/${photoParams}`;

    const res = await axios({
      method: 'PATCH',
      url,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', `Your cast/crew's ${message} has been updated!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

// export const updatePersonalData = async (name, birthdate, gender) => {
//   try {
//     const res = await axios({
//       method: 'PATCH',
//       url: 'http://127.0.0.1:3000/api/v1/users/updateMe',
//       data: {
//         name,
//         birthdate,
//         gender
//       }
//     });

//     if (res.data.status === 'success') {
//       showAlert('success', 'Your data has been updated!');
//     }
//   } catch (err) {
//     showAlert('error', err.response.data.message);
//   }
// };

// export const updateEmailUsernameData = async (email, username) => {
//   try {
//     const res = await axios({
//       method: 'PATCH',
//       url: 'http://127.0.0.1:3000/api/v1/users/updateMe',
//       data: {
//         email,
//         username
//       }
//     });

//     if (res.data.status === 'success') {
//       showAlert('success', 'Your email/password has been updated!');
//     }
//   } catch (err) {
//     showAlert('error', err.response.data.message);
//   }
// };
