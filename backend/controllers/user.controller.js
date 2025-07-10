import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//==============Register user
// Register user :  /api/user/register

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // name nahi, email nahi, password nahi
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // check user already register in database or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Token Generate
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // Token store in Cookies
    res.cookie("token", token, {
      httpOnly: true, //prevent from javscript to not access token
      secure: process.env.NODE_ENV === "production", //production cookies ko production me securly use karenga
      sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.json({
      message: "User registered successfully",
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// hash(password, 10) ---> password come by body,  10 time password ko round kar denga.
//Token Generate = user ko front ent ke upper Athenticate kar sake jo hamara user hai waha register user hai. real user hai.
//============================
//"token", token ==> 1st is key and 2nd is value

// =======================Login User
// Login user : /api/user/login

export const loginUser = async (req, res) => {
  try {
    //take email and password form req ki body se
    const { email, password } = req.body;

    //email nahi hai or password nahi hai.
    if (!email || !password) {
      res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    //find user using email
    //user ko model(User) se find karenga
    const user = await User.findOne({ email });

    //user present nahi hai
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }

    //compare password
    const isMatch = await bcrypt.compare(password, user.password);

    //password not match
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }
    //Token Generate
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // Token store in Cookies
    res.cookie("token", token, {
      httpOnly: true, //prevent from javscript to not access token
      secure: process.env.NODE_ENV === "production", //production cookies ko production me securly use karenga
      sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.json({
      message: "logged in successfully",
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =======================Logout User
//logout user :  /api/user/logout

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
    });
    res.json({
      message: "User logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ==============================Check Auth User

//check auth user : /api/user/is-auth
