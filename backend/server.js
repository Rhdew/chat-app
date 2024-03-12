const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data/data");
const cors = require("cors");
const dbConnection = require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

dbConnection();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("root");
  res.send("root path");
});

app.use("/api/user", userRoutes);

app.get("/api/data", (req, res) => {
  res.send(chats);
});

app.get("/api/data/:id", (req, res) => {
  res.send(chats.find((chat) => chat._id === req.params.id));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("listening...", PORT));
