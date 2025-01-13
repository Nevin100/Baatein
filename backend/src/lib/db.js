import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongoose is connected to CHAT_DB");
  } catch (error) {
    console.log(error);
  }
};
