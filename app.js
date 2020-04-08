const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

const shows = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/shows-simple.json`)
);

const getAllShows = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: shows.length,
    data: {
      shows
    }
  });
};

const getShow = (req, res) => {
  const id = req.params.id * 1;
  const show = shows.find(el => el.id === id);

  if (!show) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      show
    }
  });
};

const createShow = (req, res) => {
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

const updateShow = (req, res) => {
  if (req.params.id * 1 > shows.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      shows: '<Updated show here...>'
    }
  });
};

const deleteShow = (req, res) => {
  if (req.params.id * 1 > shows.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
};

app
  .route('/api/v1/shows')
  .get(getAllShows)
  .post(createShow);

app
  .route('/api/v1/shows/:id')
  .get(getShow)
  .patch(updateShow)
  .delete(deleteShow);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
