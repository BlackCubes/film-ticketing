const fs = require('fs');

const shows = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/shows-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log(`Show id is: ${val}`);

  if (req.params.id * 1 > shows.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
};

exports.getAllShows = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: shows.length,
    data: {
      shows
    }
  });
};

exports.getShow = (req, res) => {
  const id = req.params.id * 1;
  const show = shows.find(el => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      show
    }
  });
};

exports.createShow = (req, res) => {
  const newId = shows[shows.length - 1].id + 1;
  const newShow = Object.assign({ id: newId }, req.body);

  shows.push(newShow);

  fs.writeFile(
    `${__dirname}/dev-data/data/shows-simple.json`,
    JSON.stringify(shows),
    err => {
      res.status(200).json({
        status: 'success',
        data: {
          shows: newShow
        }
      });
    }
  );
};

exports.updateShow = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      shows: '<Updated show here...>'
    }
  });
};

exports.deleteShow = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};
