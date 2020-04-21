const mongoose = require('mongoose');

const imgpromoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true
    },
    image: {
      urlSmall: String,
      urlLarge: String
    },
    caption: {
      type: String,
      trim: true
    },
    copyright: {
      type: String,
      trim: true
    },
    eventOrganizer: {
      type: mongoose.Schema.ObjectId,
      ref: 'Users'
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
