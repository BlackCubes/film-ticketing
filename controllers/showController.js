// const fs = require('fs');
const Show = require('./../models/showModel');

// const shows = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/shows-simple.json`)
// );

// FOR WITHOUT MONGO:
// exports.checkID = (req, res, next, val) => {
//   console.log(`Show id is: ${val}`);

//   if (req.params.id * 1 > shows.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID'
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.title || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Did not put in the name or price!'
//     });
//   }
//   next();
// };

exports.getAllShows = async (req, res) => {
  try {
    const shows = await Show.find();

    res.status(200).json({
      status: 'success',
      results: shows.length,
      data: {
        shows
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Could not get all the shows!'
    });
  }
};

exports.getShow = async (req, res) => {
  try {
    const show = await Show.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        show
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Could not get the show!'
    });
  }

  // const id = req.params.id * 1;
  // const show = shows.find(el => el.id === id);

  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     show
  //   }
  // });
};

exports.createShow = async (req, res) => {
  try {
    const newShow = await Show.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        show: newShow
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Could not create a new show!'
    });
  }

  // const newId = shows[shows.length - 1].id + 1;
  // const newShow = Object.assign({ id: newId }, req.body);

  // shows.push(newShow);

  // fs.writeFile(
  //   `${__dirname}/dev-data/data/shows-simple.json`,
  //   JSON.stringify(shows),
  //   err => {
  //     res.status(200).json({
  //       status: 'success',
  //       data: {
  //         shows: newShow
  //       }
  //     });
  //   }
  // );
};

exports.updateShow = async (req, res) => {
  try {
    const show = await Show.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        show
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Could not update the show!'
    });
  }
};

exports.deleteShow = async (req, res) => {
  try {
    await Show.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Could not delete show!'
    });
  }
};
