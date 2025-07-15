import User from "../models/user.model.js";

//====================Update Cart
// update user cartData:  /api/cart/update

export const updateCart = async (req, res) => {
  try {
    //get useId from req.user se
    //authUser.js --> req.user = decoded.id
    const userId = req.user;
    //user.model.js ---> cartItems:{}
    const { cartItems } = req.body;
    console.log("cartItems", cartItems);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { cartItems },
      { new: true }
    );
    //not updatedUser
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found or Cart not updated",
      });
    }
    res.status(200).json({ updatedUser, success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
