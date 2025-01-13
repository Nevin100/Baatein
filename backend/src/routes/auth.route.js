import express from "express";

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send("SignUp Created");
});

router.get("/login", (req, res) => {
  res.send("Login Created");
});

router.get("/logout", (req, res) => {
  res.send("Logout Created");
});

export default router;
