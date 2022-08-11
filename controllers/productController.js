import Product from "../models/Product.js";

//Obtener los productos de la DB
const getProducts = async (req, res) => {
  const products = await Product.find().select("-__v");
  res.json(products);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);

    res.json(product);
  } catch (error2) {
    const error = new Error("Producto no encontrado");
    return res.status(404).json({ msg: error.message });
  }
};

export { getProducts, getProduct };
