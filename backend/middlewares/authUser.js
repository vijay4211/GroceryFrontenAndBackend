import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  try {
    // take token from req.cookies
    const { token } = req.cookies;
    //console.log("token", token); //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV..........

    //not tokan
    if (!token) {
      res.status(401).json({
        message: "Unauthorized",
        success: false,
      });
    }

    //decored ke under hamare use ki id hai.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log("decoded :", decoded); //decoded : { id: '687499d90662467453eb532d', iat: 1752473804, exp: 1753078604 }
    req.user = decoded.id;
    //console.log("decoded.id : ", decoded.id); // decoded.id : 687499d90662467453eb532d
    //console.log("req.user : ", req.user); // req.user :  687499d90662467453eb532d
    next();
  } catch (error) {
    console.log("Authentication error : ", error);
    return res.status(401).json({
      message: "Unauthorized",
      success: false,
    });
  }
};
