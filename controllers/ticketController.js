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
    }&theater=${req.params.theaterId}&showtime=${req.params.showtimeId}&user=${
      req.user.id
    }&price=${show.price}`,
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
  const { show, theater, showtime, user, price } = req.query;

  if (!show && !theater && !showtime && !user && !price) return next();

  await Ticket.create({ show, theater, showtime, user, price });

  res.redirect(req.originalUrl.split('?')[0]);
});

exports.getAllTickets = factory.getAll(Ticket);
exports.getTicket = factory.getOne(Ticket);
exports.createTicket = factory.createOne(Ticket);
exports.updateTicket = factory.updateOne(Ticket);
exports.deleteTicket = factory.deleteOne(Ticket);
