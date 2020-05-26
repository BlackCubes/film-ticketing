const catchAsync = require('./../utils/catchAsync');
const Show = require('./../models/showModel');

exports.getHome = catchAsync(async (req, res, next) => {
  res.status(200).render('home', {
    title: 'Rare Movie Tickets, Special Venues, Locations and Time'
  });
});

exports.getShow = (req, res) => {
  res.status(200).render('show-overview', {
    title: 'The Matrix'
  });
};
