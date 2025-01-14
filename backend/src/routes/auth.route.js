import express from "express";
import {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controllers.js";

import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

//Signup route:
router.post("/signup", signup);

//login route:
router.post("/login", login);

//logout route:
router.post("/logout", logout);

//update-profile:
router.put("/update-profile", protectRoute, updateProfile);

//checking for auth :
router.get("/check", protectRoute, checkAuth);

export default router;
