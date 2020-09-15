const authModel = require("../model/authModel");
exports.getUser = (req, res) => {
   authModel
      .findById(req.user._id)
      .select("-password")
      .then((user) => res.status(200).json({ user: user }))
      .catch((err) => req.status(400).json({ errMsg: err }));
};
