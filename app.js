const express = require('express');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const useragent = require('express-useragent');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const castcrewRouter = require('./routes/castcrewRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const showRouter = require('./routes/showRoutes');
const showtimesRouter = require('./routes/showtimesRoutes');
const theaterRouter = require('./routes/theaterRoutes');
const ticketRouter = require('./routes/ticketRoutes');
const ticketController = require('./controllers/ticketController');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// For parsing multipart/form-data
// app.use(upload.array());

// For implementing CORS
app.use(cors());
app.options('*', cors());

// Static -- displaying static files
app.use(express.static(path.join(__dirname, 'public')));

// GLOBAL MIDDLEWARES
// Helmet -- set security HTTP headers
app.use(helmet());

// Morgan -- Development logging
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

app.post(
  '/webhook-checkout',
  express.raw({ type: 'application/json' }),
  // bodyParser.raw({ type: 'application/json' }),
  ticketController.webhookCheckout
);

// Expose User-Agent
app.use(useragent.express());

// Body Parser -- reading data from the body into req.body
app.use(express.json({ limit: '50mb' })); //10kb
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

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

app.use(compression());

// app.use((req, res, next) => {
//   console.log('Hello from the middleware!');
//   next();
// });

// ROUTES
app.use('/', viewRouter);
app.use('/api/v1/castcrews', castcrewRouter);
app.use('/api/v1/shows', showRouter);
app.use('/api/v1/showtimes', showtimesRouter);
app.use('/api/v1/theaters', theaterRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/tickets', ticketRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Could not find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
