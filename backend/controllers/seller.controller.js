import jwt from "jsonwebtoken";

//==============================sellerLogin
//seller login : /api/seller/login

export const sellerLogin = async (req, res) => {
  try {
    //get email and password from req.body
    const { email, password } = req.body;

    if (
      email === process.env.SELLER_EMAIL &&
      password === process.env.SELLER_PASSWORD
    ) {
      //generate token
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7h",
      });
      //create token for seller and token store in cookie
      res.cookie("sellerToken", token),
        {
          httpOnly: true, //prevent from javscript to not access token
          secure: process.env.NODE_ENV === "production", //production cookies ko production me securly use karenga
          sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        };
      res.status(200).json({ message: "Login successful", success: true });
    }
  } catch (error) {
    console.error("Error in sellerLogin : ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
