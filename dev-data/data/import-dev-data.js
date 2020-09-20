const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const CastCrew = require('./../../models/castcrewModel');
const Review = require('./../../models/reviewModel');
const Show = require('./../../models/showModel');
const Showtimes = require('./../../models/showtimesModel');
const Theater = require('./../../models/theaterModel');
const User = require('./../../models/userModel');
const Model = require('./../../models');

dotenv.config({ path: './../../config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection to import data successful!'));

// READ JSON FILES
const castcrews = JSON.parse(
  fs.readFileSync(`${__dirname}/castcrew.json`, 'utf-8')
);

//const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));

const shows = JSON.parse(fs.readFileSync(`${__dirname}/shows.json`, 'utf-8'));

const showtimes = JSON.parse(
  fs.readFileSync(`${__dirname}/showtimes.json`, 'utf-8')
);

const theaters = JSON.parse(
  fs.readFileSync(`${__dirname}/theaters.json`, 'utf-8')
);

//const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importDataCastCrew = async () => {
  try {
    await CastCrew.create(castcrews);
    console.log('Castcrew data successfully imported!');
  } catch (err) {
    console.log('Could not import the castcrew data into DB!', err);
  }
  process.exit();
};

const importDataReview = async () => {
  try {
    await Review.create(reviews);
    console.log('Review data successfully imported!');
  } catch (err) {
    console.log('Could not import review Data into DB!', err);
  }
  process.exit();
};

const importDataShow = async () => {
  try {
    await Show.create(shows);
    console.log('Show data successfully imported!');
  } catch (err) {
    console.log('Could not import show data into DB!', err);
  }
  process.exit();
};

const importDataShowtimes = async () => {
  try {
    await Showtimes.create(showtimes);
    console.log('Showtimes data successfully imported!');
  } catch (err) {
    console.log('Could not import the showtimes data into DB!', err);
  }
  process.exit();
};

const importDataTheater = async () => {
  try {
    await Theater.create(theaters);
    console.log('Theater data successfully imported!');
  } catch (err) {
    console.log('Could not import theater data into DB!', err);
  }
  process.exit();
};

const importDataUser = async () => {
  try {
    await User.create(users);
    console.log('User data successfully imported!');
  } catch (err) {
    console.log('Could not import user data into DB!', err);
  }
  process.exit();
};

// DELETE ALL DATA FROM COLLECTION
const deleteData = async table => {
  try {
    await Model[table].deleteMany();
    console.log(`${table} data successfully deleted!`);
  } catch (err) {
    console.log(`Could not delete the ${table} data from the collection!`, err);
  }
  process.exit();
};

// ADMIN MUST ENTER PASSWORD
const passwordValidator = password => {
  if (!password) {
    console.log('You need to provide a password for your last argument!');
    return false;
  }
  if (password !== process.env.DATABASE_PASSWORD) {
    console.log('Incorrect password!');
    return false;
  }

  return true;
};

if (process.argv[2] === '--import') {
  if (process.argv[3] === 'castcrew') importDataCastCrew();
  if (process.argv[3] === 'review') importDataReview();
  if (process.argv[3] === 'show') importDataShow();
  if (process.argv[3] === 'showtime') importDataShowtimes();
  if (process.argv[3] === 'theater') importDataTheater();
  if (process.argv[3] === 'user') importDataUser();
} else if (process.argv[2] === '--delete') {
  if (passwordValidator(process.argv[4])) deleteData(process.argv[3]);
}
