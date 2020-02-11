// Load required packages
var User = require('../models/user.model.js');

// Create endpoint /api/users for POST
exports.postUsers = function (req, res) {
  if (!req.body.username) {
    return res.status(400).send({
      message: "O usuario é obrigatorio"
    });
  }

  if (!req.body.email) {
    return res.status(400).send({
      message: "O email é obrigatorio"
    });
  }

  if (!req.body.password) {
    return res.status(400).send({
      message: "O senha é obrigatorio"
    });
  }

  var user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  user.save()
    .then(data => {
      res.json({_id: data._id, username: data.username});
    }).catch(err => {
      res.status(err.statusCode || 500).json(err);
      return;
    });

};

// Create endpoint /api/users for GET
exports.getUsers = function (req, res) {
  User.find(function (err, users) {
    if (err)
      return res.send(err);

    res.json(users);
  });
};