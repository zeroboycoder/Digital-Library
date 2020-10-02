const authMdodel = require("../model/authModel");

exports.bookRequest = (req, res) => {
   const { bookName, major } = req.body;
   console.log(bookName, major);
   authMdodel
      .find({ major: major })
      .then((user) => {
         res.json(user);
      })
      .catch((err) => console.log(err));
};
