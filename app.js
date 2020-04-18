const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const showRouter = require('./routes/showRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// GLOBAL MIDDLEWARES
// Helmet -- Set security HTTP headers
app.use(helmet());

// Morgan -- Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Express-Rate-Limit -- Limit requests from same API
const limiter = rateLimit({
  // Based on the type of app you have
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body Parser -- Reading data from the body into req.body
app.use(express.json({ limit: '10kb' }));

// Data Sanitization
// -- against NoSQL query injection
app.use(mongoSanitize());

// -- against XSS
app.use(xss());

// Static -- Displaying static files
//app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   console.log('Hello from the middleware!');
//   next();
// });

// ROUTES
app.use('/api/v1/shows', showRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Could not find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
