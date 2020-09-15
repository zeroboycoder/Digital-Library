const route = require("express").Router();
const userController = require("../../controllers/userController");
const userMiddleware = require("../../middleware/user");

// Get User
/* /api/user */
route.get("/", userMiddleware, userController.getUser);

module.exports = route;
