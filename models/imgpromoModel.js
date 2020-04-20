const mongoose = require('mongoose');

const imgpromoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true
    },
    imageSmallUrl: {
      type: String,
      trim: true
    },
    imageLargeUrl: {
      type: String,
      trim: true
    },
    caption: {
      type: String,
      trim: true
    },
    copyright: {
      type: String,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const ImgPromo = mongoose.model('ImgPromo', imgpromoSchema);

module.exports = ImgPromo;
