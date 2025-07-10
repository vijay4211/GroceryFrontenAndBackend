import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";

dotenv.config();

const app = express();
connectDB();

//pass frontend url here
const allowedOrigins = ["http://localhost:5173"];

//middlewares
app.use(express.json()); //take data json formatt
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(cookieParser());

//Api Endpointes
app.get("/", (req, res) => {
  res.send("Hello World");
});

//PORT = 5000 || 4000
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
