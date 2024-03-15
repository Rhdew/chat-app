const express = require("express");

const {
  registerUser,
  authUser,
  allGetUsers,
} = require("../controllers/userController");
const { Protect } = require("../middleware/userAuthMiddleware");

const router = express.Router();

router.route("/").post(registerUser).get(Protect, allGetUsers);
router.route("/login").post(authUser);

module.exports = router;
