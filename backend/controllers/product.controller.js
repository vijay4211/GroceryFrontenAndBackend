import Product from "../models/product.model.js";

//===========================Add Product
// add product : /api/product/add-product
export const addProduct = async (req, res) => {
  try {
    //get all from request ki body
    const { name, description, price, offerPrice, category } = req.body;

    //handle images
    const image = req.files?.map((file) => file.filename);

    if (
      !name ||
      !price ||
      !offerPrice ||
      !category ||
      !image ||
      image.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields including images are required",
      });
    }
    // create product for database
    await Product.create({
      name,
      description,
      price,
      offerPrice,
      category,
      image,
    });
    res.status(201).json({
      message: "Product added successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

//=========================Get Products
// get products : /api/product/list

export const getProducts = async (req, res) => {
  try {
    //show all products use find
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json({ products, success: true });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Server error",
      error: error.message,
    });
  }
};

//createdAt: -1  ====>>> jo product sabse last add karenge waha sabse pahile show honga.

// ==============================Get Single Product
// get single product :  /api/product/id
export const getProductById = async (req, res) => {
  try {
    //get id from request ki body
    const { id } = req.body;
    //product find by id from database
    const product = await Product.findById(id);
    //not product
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }
    res.status(200).json({ product, success: true });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

//==========================Change Stock
// change stock : /api/product/stock

export const changeStock = async (req, res) => {
  try {
    //get id and inStock from request ki body
    const { id, inStock } = req.body;
    //product find by id and update it
    const product = await Product.findByIdAndUpdate(
      id,
      { inStock },
      { new: true }
    );
    //not product
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }
    res.status(200).json({
      product,
      success: true,
      message: "Stock updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
