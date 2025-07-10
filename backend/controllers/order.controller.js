import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

//===========================place Order
// Place Order COD:  /api/order/place

export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.user;
    const { items, address } = req.body;
    //not items and not address
    if (!items || !address) {
      return res
        .status(400)
        .json({ message: "Items and address are required", success: false });
    }

    //calculate amount
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    //Add tax charges 2%
    amount += Math.floor((amount * 2) / 100);

    //create Order
    await Order.create({
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      isPaid: false,
    });
    res.status(201).json({
      message: "Order placed successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error placing order : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



