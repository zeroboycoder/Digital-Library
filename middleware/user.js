const jwt = require("jsonwebtoken");
const config = require("config");

const getUser = (req, res, next) => {
   const token = req.header("elib-auth-token");
   if (!token) {
      return res
         .status(401)
         .json({ errMsg: "No token, authorization denied!" });
   }
   try {
      const decodedUser = jwt.verify(token, config.get("JWTSECRET"));
      req.user = decodedUser;
      next();
   } catch (error) {
      return res.status(401).json({ errMsg: "Invalid token" });
   }
};

module.exports = getUser;
