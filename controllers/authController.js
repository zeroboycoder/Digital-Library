const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");

const authModel = require("../model/authModel");

// Sign Up User
exports.signUpUser = (req, res) => {
   const { username, email, password } = req.body;
   authModel.findOne({ email: email }).then((user) => {
      if (user) {
         console.log(user);
         return res.status(500).json({ errMsg: "This email is already taken" });
      }
      bcrypt.genSalt(10, (err, salt) => {
         if (err) throw err;
         bcrypt.hash(password, salt, (err, hashPassword) => {
            new authModel({
               username: username,
               email: email,
               password: hashPassword,
            })
               .save()
               .then((newUser) => {
                  jwt.sign(
                     { _id: newUser._id },
                     config.get("JWTSECRET"),
                     (err, token) => {
                        if (err) throw err;
                        return res.status(200).json({
                           token,
                           user: {
                              username: newUser.username,
                              email: newUser.email,
                           },
                        });
                     }
                  );
               })
               .catch((err) =>
                  res
                     .status(500)
                     .json({ errMsg: "Having error in signup user" })
               );
         });
      });
   });
};

// Sign In User
exports.signInUser = (req, res) => {
   const { email, password } = req.body;
   authModel
      .findOne({ email: email })
      .then((user) => {
         bcrypt
            .compare(password, user.password)
            .then((isMatch) => {
               if (!isMatch) {
                  return res
                     .status(400)
                     .json({ errMsg: "Password Doesn't Match" });
               }
               jwt.sign(
                  { _id: user._id },
                  config.get("JWTSECRET"),
                  (err, token) => {
                     return res.status(200).json({
                        token,
                        user: {
                           username: user.username,
                           email: user.email,
                        },
                     });
                  }
               );
            })
            .catch((err) => {
               throw err;
            });
      })
      .catch((err) => {
         throw err;
      });
};
