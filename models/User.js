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
    genre_like: [{}],
    movie_like: [{}]
  },
  {
    timestamps: true
  }
);

var User = mongoose.model('User', UserSchema);

module.exports = User;
