const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side!', app: 'Kinetotickets' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...');
// });

const shows = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/shows-simple.json`)
);

app.get('/api/v1/shows', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: shows.length,
    data: {
      shows
    }
  });
});

app.get('/api/v1/shows/:id', (req, res) => {
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
});

app.post('/api/v1/shows', (req, res) => {
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
});

app.patch('/api/v1/shows/:id', (req, res) => {
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
});

app.delete('/api/v1/shows/:id', (req, res) => {
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
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
