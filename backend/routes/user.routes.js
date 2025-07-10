import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { authUser } from "../middlewares/authUser.js";

const router = express.Router();

//Routes Define
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", authUser, logoutUser);

export default router;

//Note: jo user login honga wahi logout kar sakta hai.
