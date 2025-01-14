import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  getUsersForSidebar,
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

//getting users for sidebar menu :
router.get("/users", protectRoute, getUsersForSidebar);

//getting messages latest order :
router.get("/:id", protectRoute, getMessages);

//sending messages :
router.post("/send/:id", protectRoute, sendMessage);

export default router;
