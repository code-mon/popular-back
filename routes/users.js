const User = require("../models/User.js");


module.exports = function (app) {
  app.get("/user/:id", function (req, res) {
    User.find({ "_id": req.params.id }, function (err, data) {
      if (err) {
        console.log("User couldn't be found " + err);
        res.json(err)
      }
      else {
          res.json(data);
      }
    });
  });

  app.post("/user", function (req, res) {
    User.find({ "user_name": req.body.user_name }, function (err, data) {
      if (err) {
        console.log("User couldn't be added " + err);
        res.json(err)
      }
      else {
        if (!data.length) {
          var newUser = new User(req.body);
          newUser.save(function (err, data) {
            if (err) {
              console.log("User couldn't be added " + err);
              res.json(err);
            }
            console.log(data.user_name + " added");
            res.json(data);
          })
        } else {
          res.json({
            "error": "Username taken",
            "_id": data[0].id
          });
        }
      }
    });
  });

  app.put("/user/:id", function (req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, { $set: { "genre_like": req.body.genre_like } }, { new: true }, function (err, doc) {
      if (err) {
        console.log("User couldn't be updated " + err);
        res.json(err)
      } else {
      console.log(doc.user_name + " updated");
      res.json(doc);
      }
    });
  });

};