const express = require("express");
const { Protect } = require("../middleware/userAuthMiddleware");
const { createChat, fetchChats } = require("../controllers/chatController");

const router = express.Router();

router.route("/").post(Protect, createChat);
router.route("/").get(Protect, fetchChats);

module.exports = router;
