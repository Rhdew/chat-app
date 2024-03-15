const express = require("express");
const { Protect } = require("../middleware/userAuthMiddleware");
const {
  createChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chatController");

const router = express.Router();

router.route("/").post(Protect, createChat);
router.route("/").get(Protect, fetchChats);
router.route("/groupChat").post(Protect, createGroupChat);
router.route("/renameGroup").put(Protect, renameGroup);
router.route("/add").put(Protect, addToGroup);
router.route("/remove").put(Protect, removeFromGroup);

module.exports = router;
