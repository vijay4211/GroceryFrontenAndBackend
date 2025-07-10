import express from "express";
import { sellerLogin } from "../controllers/seller.controller.js";
import {
  authSeller,
  isAuthSeller,
  sellerLogout,
} from "../middlewares/authSeller.js";
const router = express.Router();

//Routes Define
router.post("/Login", sellerLogin);
router.get("/is-auth", authSeller, isAuthSeller);
router.post("/logout", authSeller, sellerLogout);

export default router;
