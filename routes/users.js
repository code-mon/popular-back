const User = require("../models/User.js");


module.exports = function (app) {
app.get("/user", function (req, res) {
    User.find({}, function (err, data) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(data);
      }
    });
  });

  app.post("/user", function (req, res) {
      var newUser = new User(req.body);
      newUser.save(function (err, data) {
        if (err) {
          console.log("User couldn't be added " + err);
          res.json({"Error": err});
          return;
        }
        console.log(data.user_name + " added");
        res.json(data);
      })
  });
  
  

};