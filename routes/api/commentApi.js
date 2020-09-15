const route = require("express").Router();

const commentController = require("../../controllers/commentController");

route.post("/:book_id", commentController.addComment);

module.exports = route;
