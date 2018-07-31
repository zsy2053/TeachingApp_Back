var jwt = require('jsonwebtoken');
var mongoose = require('mongoose')
  User = mongoose.model('User');

exports.list_all_users = (req, res) => {
  User.find({}, (err, user) => {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};

exports.create_a_user = (req, res) => {
  var new_user = new User(req.body);
  new_user.save((err, user) => {
    if (err) {
      res.send(err);
    }
    res.json(user)
  });
};

exports.sign_in_a_user = (req, res) => {
  User.findOne({
    username: req.body.username
  }, (err, user) => {
    if (err) throw err;
    if (user === null) {
      return res.json({ success: false, message: "Authentication failed, user not found"})
    } else if (user !== null) {
      if (user.password != req.body.password) {
        return res.json({ success: false, message: "Invalid user name or password"})
      } else {
        const payload = {
          user_id: user.id
        }

        let token = jwt.sign(payload, app.get('superSecret'), {
          expiresInMinutes: 1440
        });

        return res.json({
          success: true,
          message: "Authenticated user",
          token: token
        })
      }
    }
  })
}

exports.read_a_user = (req, res) => {
  User.find({username: req.params.username, password: req.params.password, status: req.params.status}, (err, user) => {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};

exports.update_a_user = (req, res) => {
  User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, (err, user) => {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};

exports.delete_a_user = (req, res) => {
  User.remove({
    _id: req.params.userId
  }, (err, user) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'User successfully deleted'});
  });
};
