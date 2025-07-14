import jwt from "jsonwebtoken";

//=====================auth Seller
export const authSeller = async (req, res, next) => {
  try {
    // take token from req.cookies
    const { sellerToken } = req.cookies;
    //console.log("sellerToken : ", sellerToken); // sellerToken :  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.....

    //not sellerToken
    if (!sellerToken) {
      res.status(401).json({
        message: "Unauthorized",
        success: false,
      });
    }

    //decored ke under hamare use ki id hai.
    const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);
    //console.log("decoded : ", decoded); // decoded :  { email: 'admin@gmail.com', iat: 1752478158, exp: 1752503358 }

    if (decoded.email === process.env.SELLER_EMAIL) {
      return next();
    } else {
      return res.status(403).json({ message: "Forbidden", success: false });
    }
  } catch (error) {
    console.error("Error in authSeller middleware:", error);
    return res.status(401).json({
      message: "Unauthorized - Invalid token",
      success: false,
    });
  }
};

//===============================Logout Seller
// Logout seller : /api/seller/logout
export const sellerLogout = async (req, res) => {
  try {
    // Selller ne logout kelyane Cookie clear zali pahije
    res.clearCookie("sellerToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
    });
    res.status(200).json({
      message: "Logout successful",
      success: true,
    });
  } catch (error) {
    console.error("Error in sellerLogout : ", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// user already login hogna tabhi waha logout ho sakta hai.

//=========================Check Auth Seller
// check auth seller : /api/seller/is-auth

export const isAuthSeller = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Error in isAuthSeller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
