const express = require('express');
const morgan = require('morgan');
const showRouter = require('./routes/showRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   console.log('Hello from the middleware!');
//   next();
// });

// Routes
app.use('/api/v1/shows', showRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Could not find ${req.originalUrl} on this server!`
  });
  next();
});

module.exports = app;
