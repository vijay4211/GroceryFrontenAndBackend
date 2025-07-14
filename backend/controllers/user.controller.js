import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//==============Register user
//POST - http://localhost:5000/api/user/register
// Register user :  /api/user/register

export const registerUser = async (req, res) => {
  try {
    //req.body mhanje je pan aapan postman madhe entry keli tya hya req.body madhe yetat.
    const { name, email, password } = req.body;
    // console.log("name : ", name); // name :  babar
    // console.log("email : ", email); // email : babar@gmail.com
    // console.log("password : ", password); // password : 1234

    // name nahi, email nahi, password nahi
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // check user already register in database or not
    const existingUser = await User.findOne({ email });

    /*
  console.log("existingUser : ", existingUser);

  existingUser :  {
  _id: new ObjectId('6874a6342c8f9bc86e3a302b'),
  name: 'babar',
  email: 'babar@gmail.com',
  password: '$2b$10$PmM1YQB.G6fBUXWjV./uRe6ItypaUA1bwUNdUUJr4sU4.vAu1K0tC',
  cartItems: {},
  __v: 0
}
    */

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword : ", hashedPassword); //hashedPassword :  $2b$10$SOqg3qm.KSv3dDvhXWX.F.7W/aHxBCr13zZEVvll2tffYpwC.vI8.

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    // console.log("name : ", name); // name :  babar
    // console.log("email : ", email); // email : babar@gmail.com
    // console.log("password : ", password); // password : 1234

    // Token Generate
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //console.log("token : ", token); // token :  eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp....

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
//POST - http://localhost:5000/api/user/login
// Login user : /api/user/login

export const loginUser = async (req, res) => {
  try {
    //take email and password form req ki body se
    const { email, password } = req.body;
    //console.log("email : ", email); // email : babar@gmail.com
    //console.log("password : ", password); // password : 1234

    //email nahi hai or password nahi hai.
    if (!email || !password) {
      res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    //find user using email
    //user ko model(User) se find karenga
    const user = await User.findOne({ email });

    /*
  console.log("user : ", user);
      
  user :  {
  _id: new ObjectId('6874a78c7a6ddd532d92cc52'),
  name: 'babar',
  email: 'babar@gmail.com',
  password: '$2b$10$FDRm.IFFySDzGeG8nhcYC.Z4ZlRA25D6eJvFEr1rJqcrtYrjJN1T.',
  cartItems: {},
  __v: 0
}
    */

    //user present nahi hai
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }

    //compare password
    const isMatch = bcrypt.compare(password, user.password);
    //console.log("isMatch : ", isMatch); //isMatch :  Promise { <pending> }

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
    //console.log("token : ", token);  // token : eyJhbGciOiJIUzI1NiIsInR5.....

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
//GET - http://localhost:5000/api/user/logout
//logout user :  /api/user/logout

export const logoutUser = async (req, res) => {
  try {
    // User ne logout kelyananatar je token Cookies madhe store kelele aahe te remove zale pahije.
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
//GET - http://localhost:5000/api/user/is-auth
//check auth user : /api/user/is-auth

export const isAuthUser = async (req, res) => {
  //console.log("req : ", res);
  //console.log("res : ", res);

  try {
    //get use id from req.user
    const userId = req.user;
    //console.log("userId : ", userId); // userId :  687499d90662467453eb532d

    //not useId
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    //find user
    //user ka name and email chahiye. password nahi chahiye
    //.select("-password"); --> remove password
    const user = await User.findById(userId).select("-password");
    console.log("user : ", user);
    /*
  user :  {
  _id: new ObjectId('687499d90662467453eb532d'),
  name: 'babar',
  email: 'babar@gmail.com',
  cartItems: {},
  __v: 0
}
*/

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error" });
  }
};
