const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data/data");
dotenv.config();

const app = express();

app.get("/", (req, res) => {
  console.log("root");
  res.send("root path");
});

app.get("/api/data", (req, res) => {
  res.send(chats);
});

app.get("/api/data/:id", (req, res) => {
  res.send(chats.find((chat) => chat._id === req.params.id));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log("listening..."));
