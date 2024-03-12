const mongoose = require("mongoose");

const dbConnection = async () => {
  const url = process.env.MONGO_URI;
  console.log("url", url);
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongodb connected, ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error,${error.message}`);
    process.exit;
  }
};

module.exports = dbConnection;
