/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

var stripe = Stripe(
  'pk_test_51GvY8yFksn4CiPD44IqL7dQXEFQtq1NStE30qwKbsINFBvKfo7D0mGasAaPbb2Ftau2RoMWXvWFInrYJaYKZLaWa00riVAwFjL'
);

export const ticketShow = async showId => {
  try {
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/tickets/checkout-session/${showId}`
    );

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
