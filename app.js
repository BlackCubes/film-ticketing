const express = require('express');
const morgan = require('morgan');
const showRouter = require('./routes/showRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Middlewares
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware!');
  next();
});

// Routes
app.use('/api/v1/shows', showRouter);
app.use('/api/v1/users', userRouter);

// Start Server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
