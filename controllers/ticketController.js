const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Show = require('./../models/showModel');
const Ticket = require('./../models/ticketModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const show = await Show.findById(req.params.showId);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/?show=${
      req.params.showId
    }&user=${req.user.id}&price=${show.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/show-overview/${
      show.slug
    }`,
    customer_email: req.user.email,
    client_reference_id: req.params.showId,
    line_items: [
      {
        name: `${show.title} Show`,
        description: show.overview,
        // images: [],
        amount: show.price * 100,
        currency: 'usd',
        quantity: 1
      }
    ]
  });

  res.status(200).json({
    status: 'success',
    session
  });
});

exports.createTicketCheckout = catchAsync(async (req, res, next) => {
  const { show, user, price } = req.query;

  if (!show && !user && !price) return next();

  await Ticket.create({ show, user, price });

  res.redirect(req.originalUrl.split('?')[0]);
});
