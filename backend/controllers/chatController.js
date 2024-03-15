const asyncHandler = require("express-async-handler");
const Chat = require("../Models/chatModel");
const User = require("../Models/userModel");

const createChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("userId is not sent");
    return res.status(400).send("ERROR : user id is not sent");
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    let createChatData = {
      chatName: "Mark",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(createChatData);

      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      res.status(200).send(fullChat);
    } catch (error) {
      res.status(400).send("something goes wrong", error.message);
    }
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (result) => {
        result = await User.populate(result, {
          path: "latestMessage.sender",
          select: "name email",
        });

        res.status(200).send(result);
      });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.users) {
    console.log("fill all the fields");
    return res.status(400).send("pls fill all the fields");
  }

  //from frontend in string form the users will sent
  //needs to pasre in obj format
  let users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  users.push(req.user);

  try {
    const groupChatData = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChatData = await Chat.findOne({ _id: groupChatData._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).send(fullGroupChatData);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  const { chatName, chatId } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(400).send("chat not found");
  } else {
    res.json(updatedChat);
  }
});

const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
});

const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
});

module.exports = {
  createChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
};
