const GoogleAuth = require('google-auth-library');
const User = require('../models/User.js');

module.exports = function(app) {
  app.get('/user/:id', function(req, res) {
    User.find({ _id: req.params.id }, function(err, data) {
      if (err) {
        console.log("User couldn't be found " + err);
        res.json(err);
      } else {
        res.json(data);
      }
    });
  });

  app.post('/user', function(req, res) {
    // check if token is valid
    const id_token = req.body.id_token;
    verifyToken(id_token)
      .then(result => {
        // token valid, look for user in database
        let { payload, userId } = result;

        User.find({ google_id: userId }, function(err, data) {
          if (err) {
            console.log(err);
            return res.json({ error: err });
          }
          if (data.length) {
            // user returned from database
            return res.json({ user: data[0] });
          }

          // user not in database, so add new user
          const newUser = new User({
            google_id: userId,
            first_name: payload.given_name,
            last_name: payload.family_name,
            email: payload.email
          });
          newUser.save(function(err, data) {
            if (err) {
              console.log("User couldn't be added: " + err);
              return res.json({ error: err });
            }
            console.log(data);
            return res.json({ user: data });
          });
        });
      })
      .catch(err => {
        res.json({ error: err.message });
      });
  });

  app.put('/user/:id', function(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { genre_like: req.body.genre_like } },
      { new: true },
      function(err, doc) {
        if (err) {
          console.log("User couldn't be updated " + err);
          res.json(err);
        } else {
          console.log(doc.user_name + ' updated');
          res.json(doc);
        }
      }
    );
  });

  const verifyToken = id_token => {
    return new Promise((resolve, reject) => {
      const auth = new GoogleAuth();
      const client = new auth.OAuth2(process.env.CLIENT_ID, '', '');
      client.verifyIdToken(id_token, process.env.CLIENT_ID, function(
        err,
        login
      ) {
        if (login) {
          payload = login.getPayload();
          userId = payload['sub'];
          resolve({ payload, userId });
        } else {
          // invalid token, respond with error
          reject(err);
        }
      });
    });
  };
};
