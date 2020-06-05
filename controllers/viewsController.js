const catchAsync = require('./../utils/catchAsync');
const Show = require('./../models/showModel');
const Theater = require('./../models/theaterModel');

exports.getHome = catchAsync(async (req, res, next) => {
  res.status(200).render('home', {
    title: 'Rare Movie Tickets, Special Venues, Locations and Time'
  });
});

exports.getShows = catchAsync(async (req, res, next) => {
  const shows = await Show.find();

  res.status(200).render('shows', {
    title: 'Multiple shows',
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

  res.status(200).render('show-overview', {
    title: show.title,
    show
  });
});

exports.getTheater = catchAsync(async (req, res, next) => {
  const theater = await Theater.findOne({ slug: req.params.slug }).populate({
    path: 'showtimes',
    fields: 'shows startDateTime endDateTime' // Fix security issues
  });

  res.status(200).render('theater-overview', {
    title: theater.name,
    theater
  });
});
