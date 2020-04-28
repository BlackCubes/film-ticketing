const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const CastCrew = require('./../../models/castcrewModel');
const Show = require('./../../models/showModel');
const Showtimes = require('./../../models/showtimesModel');
const Theater = require('./../../models/theaterModel');
const User = require('./../../models/userModel');

dotenv.config({ path: './config.env' });

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

const shows = JSON.parse(fs.readFileSync(`${__dirname}/shows.json`, 'utf-8'));

const showtimes = JSON.parse(
  fs.readFileSync(`${__dirname}/showtimes.json`, 'utf-8')
);

const theaters = JSON.parse(
  fs.readFileSync(`${__dirname}/theaters.json`, 'utf-8')
);

const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

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
const deleteDataCastCrew = async () => {
  try {
    await CastCrew.deleteMany();
    console.log('Castcrew data successfully deleted!');
  } catch (err) {
    console.log('Could not delete the castcrew data from collection!', err);
  }
  process.exit();
};

const deleteDataShow = async () => {
  try {
    await Show.deleteMany();
    console.log('Show data successfully deleted!');
  } catch (err) {
    console.log('Could not delete the show data from collection!', err);
  }
  process.exit();
};

const deleteDataShowtimes = async () => {
  try {
    await Showtimes.deleteMany();
    console.log('Showtimes data successfully deleted!');
  } catch (err) {
    console.log('Could not delete the showtimes data from collection!', err);
  }
  process.exit();
};

const deleteDataTheater = async () => {
  try {
    await Theater.deleteMany();
    console.log('Theater data successfully deleted!');
  } catch (err) {
    console.log('Could not delete the theater data from collection!', err);
  }
  process.exit();
};

const deleteDataUser = async () => {
  try {
    await User.deleteMany();
    console.log('User data successfully deleted!');
  } catch (err) {
    console.log('Could not delete the user data from collection!', err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  if (process.argv[3] === 'castcrew') importDataCastCrew();
  if (process.argv[3] === 'show') importDataShow();
  if (process.argv[3] === 'showtime') importDataShowtimes();
  if (process.argv[3] === 'theater') importDataTheater();
  if (process.argv[3] === 'user') importDataUser();
} else if (process.argv[2] === '--delete') {
  if (process.argv[3] === 'castcrew') deleteDataCastCrew();
  if (process.argv[3] === 'show') deleteDataShow();
  if (process.argv[3] === 'showtime') deleteDataShowtimes();
  if (process.argv[3] === 'theater') deleteDataTheater();
  if (process.argv[3] === 'user') deleteDataUser();
}
