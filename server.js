const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

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
  .then(() => console.log('The DB has been successfully connected!'));

const showSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A show must have a title!'],
    unique: true
  },
  ratingsAverage: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, 'A show must have a price!']
  }
});

const Show = mongoose.model('Show', showSchema);

const testShow = new Show({
  title: 'Lawrence of Arabia',
  ratingsAverage: 4.7,
  price: 20
});

testShow
  .save()
  .then(doc => {
    console.log(doc);
  })
  .catch(err => {
    console.log('Error on creating the document:', err);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
