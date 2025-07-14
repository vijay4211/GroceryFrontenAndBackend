import Product from "../models/product.model.js";

//===========================Add Product
// add product : /api/product/add-product
export const addProduct = async (req, res) => {
  try {
    //get all from request ki body
    const { name, description, price, offerPrice, category } = req.body;

    /*

     console.log("name : ", name);
    console.log("description : ", description);
    console.log("price : ", price);
    console.log("offerPrice : ", offerPrice);
    console.log("category : ", category);
    
name :  Samsung
description :  Samsung Mobile Phone
price :  5000
offerPrice :  4000
category :  Electonic
name :  Samsung
description :  Samsung Mobile Phone
price :  5000
offerPrice :  4000
category :  Electonic
    */

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

    /*
  console.log("product : ", products);
  ===========Output:
  product :  [
  {
    _id: new ObjectId('6874d372f72d4c391a4cda90'),
    name: 'Samsung',
    description: [ 'Samsung Mobile Phone' ],
    price: 5000,
    offerPrice: 4000,
    image: [ '1752486770049 image.jpg.png' ],
    category: 'Electronic',
    inStock: true,
    __v: 0
  }
]  
       
*/

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
    const { id } = req.params;
    //console.log("id :", id); // id : 6874d372f72d4c391a4cda90 ---->> (samsung)

    //product find by id from database
    const product = await Product.findById(id);

    /*
  console.log("product :", product);
//==========Output:
product : {
  _id: new ObjectId('6874d372f72d4c391a4cda90'),
  name: 'Samsung',
  description: [ 'Samsung Mobile Phone' ],
  price: 5000,
  offerPrice: 4000,
  image: [ '1752486770049 image.jpg.png' ],
  category: 'Electronic',
  inStock: true,
  __v: 0
}
*/

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
    console.log("id : ", id); //id :  6874dd473885f79d64f30087
    console.log("inStock :", id); // inStock : 6874dd473885f79d64f30087

    //product find by id and update it
    const product = await Product.findByIdAndUpdate(
      id,
      { inStock },
      { new: true }
    );

    /*
  console.log("product :", product);

product : {
  _id: new ObjectId('6874dd473885f79d64f30087'),
  name: 'Vivo',
  description: [ 'Vivo Mobile Phone' ],
  price: 15000,
  offerPrice: 13000,
  image: [ '1752489287396 image.jpg.png' ],
  category: 'Electronic',
  inStock: false,
  __v: 0
}

*/

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
