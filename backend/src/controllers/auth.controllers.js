import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

//signUp Controller function
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      res.status(400).json({ message: "Fields can't be empty" });
    }

    if (password.length < 6) {
      res
        .status(400)
        .json({ message: "Password must be of atleast 6 characters" });
    }

    //Checking for existing user
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "User already exists" });
    }

    //Hashing of Password :
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating a new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      //generate JWT Token
      generateToken(newUser._id, res);

      await newUser.save();

      res.status(200).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilPic: newUser.profilePic,
        message: "User has been created successfully",
        error: false,
      });
    } else {
      res.status(500).json({ message: "Internal Server issue ", error: true });
    }
  } catch (error) {
    console.log(error);
  }
};

//Login Controller function
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({ message: "Fields can't be empty" });
    }

    // Checking whether user exists or not?
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid Credentials" });
    }

    //comparing the bcryt-hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Invalid Credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      message: "User has been logged in successfully",
      error: false,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Issue", error: true });
  }
};

//logout Controller function
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout Successfull", error: false });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Issue", error: true });
  }
};

//update-profile function
export const updateProfile = async (req, res) => {};
