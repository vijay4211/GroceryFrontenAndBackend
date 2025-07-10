import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    //console.log("DB Name: ", process.env.MONGO_URL); //DB Name:  mongodb://localhost:27017/Grocery-mern-app

    console.log("mongodb connected");
  } catch (error) {
    console.log("Error connecting to MongoDB : ", error);
    process.exit(1);
  }
};
