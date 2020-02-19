const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signupController = (req, res, next) => {
  User.find({ email: req.body.email }).then(result => {
    if (result.length > 0) {
      res.json({
        messaage: "Signup Failed. Email Already Exist"
      });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          console.log(err);
          res.json({
            messaage: "Hash Failed",
            error: err
          });
        } else {
          const user = new User({
            email: req.body.email,
            password: hash
          });

          user
            .save()
            .then(result => {
              console.log(result);
              res.json({
                messaage: "User created successfully. Now you can login",
                user: result
              });
            })
            .catch(err => {
              console.log(err);
              res.json({
                messaage: "User not created"
              });
            });
        }
      });
    }
  });
};

exports.getAllUsersController = (req, res, next) => {
  User.find()
    .then(result => {
      res.json({
        result: result
      });
    })
    .catch(err => {
      res.json({
        messaage: "err",
        error: err
      });
    });
};

exports.LoginController = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;

  User.findOne({ email: email }).then(user => {
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.json({
            message: "Error Occured !"
          });
        }

        if (result) {
          let token = jwt.sign(
            { email: user.email, _id: user.id },
            "SECRET_PRIVATE_KEY",
            { expiresIn: "2h" }
          );
          res.json({
            message: "Login Successful !",
            token: token
          });
        } else {
          res.json({
            message: "Password Doesn't match !"
          });
        }
      });
    } else {
      res.json({
        message: "User Not Found !"
      });
    }
  });
};

exports.getUserById = (req, res, next) => {
  let id = req.params.id;
  User.findById(id)
    .then(user => {
      res.status(200).json({
        user
      });
    })
    .catch(err => {
      res.json({
        messaage: "Error Occured!"
      });
    });
};

exports.deleteUserById = (req, res, next) => {
  let id = req.params.id;
  User.findByIdAndRemove(id)
    .then(result => {
      res.status(200).json({
        message: "User Deleted !",
        result
      });
    })
    .catch(err => {
      res.json({
        messaage: "Error Occured!"
      });
    });
};

//  hashPass = (pass) =>{
//    console.log('pass', pass)
//   bcrypt.hash(pass, 10, (err, hash) => {
//     if (err) {
//       console.log('no work')
//       res.json({
//         messaage: "Hash Failed",
//         error: err
//       });
//     } else {
//       console.log('hash',  hash)
//       return hash;
//     }
//   })

// }

generatePassword = pass => {
  console.log("fff", bcrypt.hash(pass, 10));
  return bcrypt.hash(pass, 10);
};

exports.editUserById = (req, res, next) => {
  const id = req.params.id;

  generatePassword(req.body.password)
    .then(hashResult => {
      const updatedInfo = {
        password: hashResult
      };

      console.log("data=>", hashResult);

      User.findByIdAndUpdate(id, { $set: updatedInfo })
        .then(result => {
          res.status(200).json({
            message: "User Updated !",
            result
          });
        })
        .catch(err => {
          res.json({
            messaage: "Error Occured!"
          });
        });
    })
    .catch(e => {
      console.log("error", e);
      res.json({
        messaage: "Error Occured!"
      });
    });
};
