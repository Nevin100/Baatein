import express from "express";
import {
  signup,
  login,
  logout,
  updateProfile,
} from "../controllers/auth.controllers.js";

const router = express.Router();

//Signup route:
router.post("/signup", signup);

//login route:
router.post("/login", login);

//logout route:
router.post("/logout", logout);

//update-profile:
router.put("/update-profile", protectRoute, updateProfile);

export default router;
