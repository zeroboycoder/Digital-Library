const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");

const authModel = require("../model/authModel");

// Sign Up User
exports.signUpUser = (req, res) => {
   const { username, email, password, major } = req.body;
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
               major: major,
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
                              userId: newUser._id,
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
         if (!user) {
            return res.status(401).json({ errMsg: "Email isn't existed" });
         }
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
                           userId: user._id,
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
         console.log(err);
         return res.status(401).json({ errMsg: err });
      });
};

// Edit Credentails
exports.editCredentials = (req, res, next) => {
   const { userId, username, email, password } = req.body;
   authModel
      .findById(userId)
      .then((user) => {
         if (user) {
            if (password) {
               bcrypt.genSalt(10, (err, salt) => {
                  if (err) {
                     console.log("err in 103", err);
                     return res
                        .status(500)
                        .json({ errMsg: "Something went wrong" });
                  }
                  bcrypt.hash(password, salt, (err, hashPassword) => {
                     user.password = hashPassword;
                     user.save().then((newUser) => {
                        return res.status(200).json({
                           user: {
                              userId: newUser._id,
                              username: newUser.username,
                              email: newUser.email,
                           },
                        });
                     });
                  });
               });
            }
            username ? (user.username = username) : null;
            email ? (user.email = email) : null;
            user.save().then((newUser) => {
               return res.status(200).json({
                  user: {
                     userId: newUser._id,
                     username: newUser.username,
                     email: newUser.email,
                  },
               });
            });
         }
      })
      .catch((err) => console.log(err));
};
