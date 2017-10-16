var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    google_id: {
      type: String,
      required: true
    },
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    registered: {
      type: Boolean,
      required: true,
      default: false
    },
    genres: [{
      genreId: String,
      name: String
    }],
    movies: [{}]
  },
  {
    timestamps: true
  }
);

var User = mongoose.model('User', UserSchema);

module.exports = User;
