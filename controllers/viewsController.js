const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const CastCrew = require('./../models/castcrewModel');
const Review = require('./../models/reviewModel');
const Show = require('./../models/showModel');
const Theater = require('./../models/theaterModel');
const Ticket = require('./../models/ticketModel');
const User = require('./../models/userModel');

exports.getHome = catchAsync(async (req, res, next) => {
  res.status(200).render('home', {
    title: 'Rare Movie Tickets, Special Venues, Locations and Time'
  });
});

// SHOW CONTROLLER
exports.getShows = catchAsync(async (req, res, next) => {
  const shows = await Show.find();

  res.status(200).render('shows', {
    title: 'Shows',
    shows
  });
});

exports.getShow = catchAsync(async (req, res, next) => {
  const show = await Show.findOne({ slug: req.params.slug })
    .populate({
      path: 'reviews',
      fields: 'review rating user'
    })
    .populate({
      path: 'showtimes',
      fields: 'theaters startDateTime endDateTime' // Fix security issues
    });

  if (!show) {
    return next(new AppError('There is no show with that name!', 404));
  }

  res.status(200).render('show-overview', {
    title: show.title,
    show
  });
});

// THEATER CONTROLLER
exports.getTheaters = catchAsync(async (req, res, next) => {
  const theaters = await Theater.find();

  res.status(200).render('theaters', {
    title: 'Theaters',
    theaters
  });
});

exports.getTheater = catchAsync(async (req, res, next) => {
  const theater = await Theater.findOne({ slug: req.params.slug }).populate({
    path: 'showtimes',
    fields: 'shows startDateTime endDateTime' // Fix security issues
  });

  if (!theater) {
    return next(new AppError('There is no theater with that name!', 404));
  }

  res.status(200).render('theater-overview', {
    title: theater.name,
    theater
  });
});

// CASTCREW CONTROLLER
exports.getCastCrew = catchAsync(async (req, res, next) => {
  const castcrew = await CastCrew.findOne({
    slug: req.params.slug
  }).populate({
    path: 'shows',
    fields:
      'poster originalReleaseDate ratingsAverage genres title duration mpaaRating contentType slug durationHours'
  });

  if (!castcrew) {
    return next(new AppError('There is no castcrew with that name!', 404));
  }

  res.status(200).render('castcrew-overview', {
    title: castcrew.name,
    castcrew
  });
});

// USER CONTROLLER
exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'My Login'
  });
};

exports.getRegisterForm = (req, res) => {
  res.status(200).render('register', {
    title: 'My Registration'
  });
};

exports.getForgotPasswordForm = (req, res) => {
  res.status(200).render('forgotPassword', {
    title: 'Forgot My Password'
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'My Account'
  });
};

exports.getMyTickets = catchAsync(async (req, res, next) => {
  const tickets = await Ticket.find({ user: req.user.id });

  const showIds = tickets.map(el => el.show);
  const shows = await Show.find({ _id: { $in: showIds } });

  // Check if you can reuse other codes!!!
  res.status(200).render('shows', {
    title: 'My Tickets',
    shows
  });
});

exports.getMyReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ user: req.user.id });

  res.status(200).render('reviews', {
    title: 'My Reviews',
    reviews
  });
});

// -- EVENT OWNER
exports.getEventOwnerCreateShow = (req, res) => {
  res.status(200).render('createShow', {
    title: 'Create My Show'
  });
};

exports.getEventOwnerGetShows = catchAsync(async (req, res) => {
  const shows = await Show.find({ eventOrganizer: req.user.id });

  res.status(200).render('accountShows', {
    title: 'My Shows',
    shows
  });
});

exports.getEventOwnerShow = catchAsync(async (req, res) => {
  const show = await Show.findOne({
    slug: req.params.slug,
    eventOrganizer: req.user.id
  });

  res.status(200).render('accountUpdateShow', {
    title: `Update ${show.title}`,
    show
  });
});
