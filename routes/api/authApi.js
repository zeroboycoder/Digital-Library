const route = require("express").Router();

const authController = require("../../controllers/authController");

// SignUp User
/* /api/auth/signup */
route.post("/signup", authController.signUpUser);

// SignIn User
/* /api/auth/signin */
route.post("/signin", authController.signInUser);

module.exports = route;
