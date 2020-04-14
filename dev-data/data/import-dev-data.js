const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Show = require('./../../models/showModel');

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

// READ JSON FILE
const shows = JSON.parse(
  fs.readFileSync(`${__dirname}/shows-simple.json`, 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Show.create(shows);
    console.log('Data successfully imported!');
  } catch (err) {
    console.log('Could not import data into DB!', err);
  }
  process.exit();
};

// DELETE ALL DATA FROM COLLECTION
const deleteData = async () => {
  try {
    await Show.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log('Could not delete the data from collection!', err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
