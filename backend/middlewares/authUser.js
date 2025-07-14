import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  try {
    // take token from req.cookies
    const { token } = req.cookies;
    
    //get id from token

    //not tokan
    if (!token) {
      res.status(401).json({
        message: "Unauthorized",
        success: false,
      });
    }

    //decored ke under hamare use ki id hai.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (error) {
    console.log("Authentication error : ", error);
    return res.status(401).json({
      message: "Unauthorized",
      success: false,
    });
  }
};
