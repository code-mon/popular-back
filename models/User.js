var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  user_name: {
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
    required: true
  },
  genre_like: [{
  }]
  ,
  movie_like: [{
  }]
},{
  timestamps: true
});

var User = mongoose.model("User", UserSchema);

module.exports = User;
