const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  console.log("request hit to register route");
  console.log("body", req);
  const { username, email, password, pic } = req.body;

  console.log(username, email, password);

  if (!username || !email || !password) {
    res.status(400).send("Server : Enter all the fields");
  }

  const userExist = await User.findOne({ email });

  console.log("before userExist");

  if (userExist) {
    res.status(400).send("Server : user already exist");
  }
  console.log("before create");
  const user = await User.create({
    username,
    email,
    password,
    pic,
  });

  console.log("create", user);

  if (user) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).send("Server : Failed to Create the user");
  }
});

const authUser = asyncHandler(async (req, res) => {
  console.log("login route");
  console.log("body", req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send("Server : Enter all the fields");
  }

  const user = await User.findOne({ email });

  if (user && (await user.passMatch(password))) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    console.log("pass/email does'nt match");
    res.status(400).send("Server : email or password does'nt match");
  }
});

const allGetUsers = asyncHandler(async (req, res) => {
  console.log("allGetUsers", req);
  let query = {};
  if (req.query.search) {
    const searchString = req.query.search;

    query = {
      $or: [
        { username: { $regex: searchString, $options: "i" } },
        { email: { $regex: searchString, $options: "i" } },
      ],
    };
  }
  //const users = User.find(query);
  //res.send(users);
  User.find(query)
    .then((users) => {
      // Send the users in the response
      res.send(users);
    })
    .catch((error) => {
      // Handle any errors
      console.error("Error fetching users:", error);
      res.status(500).send("Internal Server Error");
    });
});

module.exports = { registerUser, authUser, allGetUsers };
