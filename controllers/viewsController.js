const catchAsync = require('./../utils/catchAsync');
const Show = require('./../models/showModel');

exports.getHome = catchAsync(async (req, res, next) => {
  res.status(200).render('home', {
    title: 'Rare Movie Tickets, Special Venues, Locations and Time'
  });
});

exports.getShows = catchAsync(async (req, res, next) => {
  const shows = await Show.find();

  res.status(200).render('shows', {
    title: 'Multiple shows'
  });
});

exports.getShow = (req, res) => {
  res.status(200).render('show-overview', {
    title: 'The Matrix'
  });
};
