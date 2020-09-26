const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { User } = require('../models');
const Show = require('./../models/showModel');
const Ticket = require('./../models/ticketModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

exports.checkTicketExists = catchAsync(async (req, res, next) => {
  if (!req.params.showId || !req.params.theaterId || !req.params.showtimeId)
    return next(
      new AppError(
        'The parameters for show, theater, and/or showtime are missing!',
        404
      )
    );

  if (req.user && req.user.role === 'event-owner')
    return next(
      new AppError(
        'You cannot buy any tickets as an event owner. Please contact the system admin for further details.',
        403
      )
    );

  const findTicket = await Ticket.valueExists({
    show: req.params.showId,
    theater: req.params.theaterId,
    showtime: req.params.showtimeId,
    user: req.user.id
  });

  if (findTicket)
    return next(
      new AppError('You have already bought a ticket for this show.', 403)
    );

  next();
});

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const show = await Show.findById(req.params.showId);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    // success_url: `${req.protocol}://${req.get('host')}/?show=${
    //   req.params.showId
    // }&theater=${req.params.theaterId}&showtime=${req.params.showtimeId}&user=${
    //   req.user.id
    // }&price=${show.price}`,
    success_url: `${req.protocol}://${req.get('host')}/myTickets`,
    cancel_url: `${req.protocol}://${req.get('host')}/show-overview/${
      show.slug
    }`,
    customer_email: req.user.email,
    // receipt_email: req.user.email,
    client_reference_id: req.params.showId,
    metadata: {
      show: req.params.showId,
      theater: req.params.theaterId,
      showtime: req.params.showtimeId
    },
    line_items: [
      {
        name: `${show.title} Show`,
        description: show.overview,
        images: [show.cloudinaryPhoto.cloudinaryUrl],
        amount: show.price * 100,
        currency: 'usd',
        quantity: 1
      }
    ]
  });

  console.log('Getcheckoutsession: ', session);

  res.status(200).json({
    status: 'success',
    session
  });
});

// exports.createTicketCheckout = catchAsync(async (req, res, next) => {
//   const { show, theater, showtime, user, price } = req.query;

//   if (!show && !theater && !showtime && !user && !price) return next();

//   await Ticket.create({ show, theater, showtime, user, price });

//   res.redirect(req.originalUrl.split('?')[0]);
// });

const createTicketCheckout = async session => {
  const { show, theater, showtime } = session.metadata;
  const price = session.amount_total / 100;
  const user = (await User.findOne({ email: session.customer_email })).id;

  console.log(
    `Show: ${show}. Theater: ${theater}. Showtime: ${showtime}. Price: ${price}. User: ${user}`
  );

  await Ticket.create(show, theater, showtime, user, price);
};

exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed')
    createTicketCheckout(event.data.object);

  console.log('Webhookcheckout: ', event);

  res.status(200).json({ received: true });
};

exports.getAllTickets = factory.getAll(Ticket);
exports.getTicket = factory.getOne(Ticket);
exports.createTicket = factory.createOne(Ticket);
exports.updateTicket = factory.updateOne(Ticket);
exports.deleteTicket = factory.deleteOne(Ticket);
