import Address from "../models/address.model.js";

//===========================Add Address
// add address : /api/address/add
export const addAddress = async (req, res) => {
  try {
    const userId = req.user;
    const { address } = req.body;
    await Address.create({
      ...address, //address copy
      userId,
    });
    res.status(201).json({
      message: "Address added successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error adding address : ", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

//==========================Get Address
// get address :  /api/address/get

export const getAddress = async (req, res) => {
  try {
    const userId = req.user;
    const addresses = await Address.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      addresses,
    });
  } catch (error) {
    console.error("Enter fetching address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
