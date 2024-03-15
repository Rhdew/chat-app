const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const asyncHandler = require("express-async-handler");

const Protect = async (req, res, next) => {
  console.log("inside Protect");
  let token = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    console.log("header", req.headers);
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log(token);

      const decodedToken = jwt.decode(token, process.env.SECRET_KEY);

      console.log("decodedToken", decodedToken);

      req.user = await User.findById(decodedToken.id).select("-password");
      //console.log("req.user", req.user);
      next();
    } catch (error) {
      res.status(401).send("Not authorized");
    }
  } else {
    console.log("did not get anything in header");
  }
};

module.exports = { Protect };
