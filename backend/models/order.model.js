import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, require: true, ref: "User" },
    items: [
      {
        product: { type: String, require: true, ref: "Product" },
        quantity: { type: Number, require: true },
      },
    ],
    amount: { type: String, require: true },
    address: { type: String, require: true, ref: "Address" },
    status: { type: String, default: "order Placed" },
    paymentType: { type: String, require: true },
    isPaid: { type: Boolean, require: true, default: false },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;

//ref: "Product"  --> product.model.js
//ref: "User"  --> user.model.js
