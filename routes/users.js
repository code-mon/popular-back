const User = require("../models/User.js");


module.exports = function (app) {
  
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/user/:id", function (req, res) {
    User.find({ "_id": req.params.id }, function (err, data) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(data);
      }
    });
  });

  app.post("/user", function (req, res) {
    if (checkUser(req.body)) {
      var newUser = new User(req.body);
      newUser.save(function (err, data) {
        if (err) {
          console.log("User couldn't be added " + err);
          res.json({ "error": err });
          return;
        }
        console.log(data.user_name + " added");
        res.json(data);
      })
    } else {
      res.json({ "error": "Username taken" });
    }
  });

  app.put("/user/:id", function (req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, { $set: {"genre_like": req.body.genre_like}  }, { new: true }, function (err, doc) {
      if (err) {
        console.log("User couldn't be updated" + err);
        return;
      }
      console.log(doc.user_name + " updated");
      res.json(doc);
    });
  });

};

function checkUser(bodyJson) {
  User.find({ "user_name": bodyJson.user_name }, function (err, data) {
    if (err) {
      return true;
    }
    else {
      return false;
    }
  });
} 