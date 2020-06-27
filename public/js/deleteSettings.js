/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

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