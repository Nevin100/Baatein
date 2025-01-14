import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

//Dotenv Config:
dotenv.config();

const app = express();
const PORT = process.env.PORT;

//Middlewares:
app.use(express.json());
app.use(cookieParser());

//Routes:
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

//Listening of PORT :
app.listen(PORT, () => {
  console.log(`The server is running on port : ${PORT}`);
  connectDB();
});
