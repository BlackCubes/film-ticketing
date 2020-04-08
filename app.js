const fs = require('fs');
const express = require('express');

const app = express();

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

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
