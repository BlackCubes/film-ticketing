exports.getHome = (req, res) => {
  res.status(200).render('home', {
    title: 'Rare Movie Tickets, Special Venues, Locations and Time'
  });
};

exports.getShow = (req, res) => {
  res.status(200).render('show', {
    title: 'The Matrix'
  });
};
