import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";
import userRoutes from "./routes/user.routes.js";
import sellerRoutes from "./routes/seller.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import addressRoutes from "./routes/address.routes.js";

// import { connectCloudinary } from "./config/cloudinary.js";
dotenv.config();

const app = express();

connectDB();
// connectCloudinary();
//pass frontend url here
const allowedOrigins = ["http://localhost:5173"];

//middlewares
app.use(express.json()); //take data json formatt
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(cookieParser());

//Routes Call
app.use("/images", express.static("uploads"));
app.use("/api/user", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/address", addressRoutes);

//Api Endpointes

/*
app.get("/", (req, res) => {
  res.send("Hello World");
});
*/

//PORT = 5000 || 4000
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
