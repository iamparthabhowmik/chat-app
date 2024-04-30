import { mongoose } from "mongoose";
// const dotenv = require("dotenv");
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(`MongoDB is not connected: ${error.message}`);
    process.exit();
  }
};

export default connectDB;
