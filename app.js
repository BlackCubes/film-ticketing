const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const castcrewRouter = require('./routes/castcrewRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const showRouter = require('./routes/showRoutes');
const showtimesRouter = require('./routes/showtimesRoutes');
const theaterRouter = require('./routes/theaterRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.set('view engine', 'pug');

// GLOBAL MIDDLEWARES
// Helmet -- set security HTTP headers
app.use(helmet());

// Morgan -- Ddvelopment logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Express-Rate-Limit -- limit requests from same API
const limiter = rateLimit({
  // Based on the type of app you have
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body Parser -- reading data from the body into req.body
app.use(express.json({ limit: '10kb' }));

// Data Sanitization
// -- against NoSQL query injection
app.use(mongoSanitize());

// -- against XSS
app.use(xss());

// HPP -- prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'mpaaRating',
      'genres',
      'price'
    ]
  })
);

// Static -- displaying static files
//app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   console.log('Hello from the middleware!');
//   next();
// });

// ROUTES
app.use('/api/v1/castcrews', castcrewRouter);
app.use('/api/v1/shows', showRouter);
app.use('/api/v1/showtimes', showtimesRouter);
app.use('/api/v1/theaters', theaterRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Could not find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
