import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: Array,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  offerPrice: {
    type: Number,
    require: true,
  },
  image: {
    type: Array,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  inStock: {
    type: Boolean,
    default: true,
    require: true,
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
