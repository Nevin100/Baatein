import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

//signUp Controller function
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
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
      generateToken();

      res
        .status(200)
        .json({ message: "User has been created successfully", error: false });
    } else {
      res.status(400).json({ message: "Internal Server issue ", error: true });
    }
  } catch (error) {
    console.log(error);
  }
};

export const login = (req, res) => {
  res;
};

export const logout = (req, res) => {
  res;
};
