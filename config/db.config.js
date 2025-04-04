import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_LOCATION);
    console.log("AI-Notes App database is connected...");
  } catch (err) {
    console.log("Failed to connect with db...", err.message);
    process.exit(1);
  }
};

export default connectDB;
