const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.log(" Database Connection Failed");
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;