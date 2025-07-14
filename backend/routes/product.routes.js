import express from "express";
import { authSeller } from "../middlewares/authSeller.js";
import {
  addProduct,
  changeStock,
  getProductById,
  getProducts,
} from "../controllers/product.controller.js";
import { upload } from "../config/multer.js";

const router = express.Router();

//Routes Define
router.post("/add-product", authSeller, upload.array("image"), addProduct);
router.get("/list", getProducts);
//single product get using id
router.get("/id", getProductById);
//seller hi product ko update karenga
router.post("/stock", authSeller, changeStock);

export default router;
