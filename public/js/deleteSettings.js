/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const deactivateUser = async (data, userId) => {
  try {
    const url = userId
      ? `http://127.0.0.1:3000/api/v1/users/deleteMe/${userId}`
      : 'http://127.0.0.1:3000/api/v1/users/deleteMe';

    const res = await axios({
      method: 'DELETE',
      url,
      data
    });

    if (res.status === 204) {
      showAlert('success', 'Account Deactivated!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const deleteShow = async (data, showId) => {
  try {
    const url = `http://127.0.0.1:3000/api/v1/shows/${showId}`;

    const res = await axios({
      method: 'DELETE',
      url,
      data
    });

    if (res.status === 204) {
      showAlert('success', 'Show deleted!');
      window.setTimeout(() => {
        location.assign('/admin/shows');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const deleteReview = async (data, reviewId) => {
  try {
    const url = `http://127.0.0.1:3000/api/v1/reviews/deleteMyReview/${reviewId}`;

    const res = await axios({
      method: 'DELETE',
      url,
      data
    });

    if (res.status === 204) {
      showAlert('success', 'Review deleted!');
      window.setTimeout(() => {
        location.assign('/myReviews');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const deleteTheater = async (data, theaterId) => {
  try {
    const url = `http://127.0.0.1:3000/api/v1/theaters/${theaterId}`;

    const res = await axios({
      method: 'DELETE',
      url,
      data
    });

    if (res.status === 204) {
      showAlert('success', 'Theater deleted!');
      window.setTimeout(() => {
        location.assign('/admin/theaters');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const deleteShowtime = async (data, showtimeId) => {
  try {
    const url = `http://127.0.0.1:3000/api/v1/showtimes/${showtimeId}`;

    const res = await axios({
      method: 'DELETE',
      url,
      data
    });

    if (res.status === 204) {
      showAlert('success', 'Showtime deleted!');
      window.setTimeout(() => {
        location.assign('/admin/showtimes');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const deleteCastCrew = async (data, castcrewId) => {
  try {
    const url = `http://127.0.0.1:3000/api/v1/castcrews/${castcrewId}`;

    const res = await axios({
      method: 'DELETE',
      url,
      data
    });

    if (res.status === 204) {
      showAlert('success', 'Cast/Crew deleted!');
      window.setTimeout(() => {
        location.assign('/admin/castcrews');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
