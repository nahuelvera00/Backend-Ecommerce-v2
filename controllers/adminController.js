import Categorie from "../models/Categories.js";
import Product from "../models/Product.js";
import SubCategorie from "../models/SubCategories.js";
import Event from "../models/Event.js";
import Order from "../models/Orders.js";
import MethodsPayment from "../models/MethodPayment.js";
import Banner from "../models/Banner.js";
import Brand from "../models/Brands.js";

//------------------------------------PRODUCTOS------------------------------------//

//Crear un nuevo Producto - PASAR A PARTE PRIVADA CON AUTH
const newProduct = async (req, res) => {
  const { subCategory, brands, small, medium, large, extraLarge, description } =
    req.body;
  const brandProduct = await Brand.findById(brands);
  let photos = [];

  const product = await new Product(req.body);

  try {
    //Seteo nombre de marca
    product.brand = brandProduct.nombre || product.brand;
    //Setear Stock
    product.waist.small = small || product.waist.small;
    product.waist.medium = medium || product.waist.medium;
    product.waist.large = large || product.waist.large;
    product.waist.extraLarge = extraLarge || product.waist.extraLarge;

    if (subCategory) {
      const subCategoryProduct = await SubCategorie.find({
        name: { $in: subCategory },
      });
      product.subCategory = subCategoryProduct[0];
    } else {
      const subCategorie = await SubCategorie.findOne({ name: "urbanas" });
      product.subCategory = subCategorie;
    }
    const fotos = req.files;
    fotos.forEach((element) => {
      photos.push(element.filename);
    });
    product.image = photos || product.image;
    product.description = description || product.description;

    const productSaved = product;
    await productSaved.save();
    res.json(productSaved);
  } catch (error) {
    res.json(error);
  }
};

const obtenerProducto = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    const error = new Error("Producto no encontrado");
    return res.status(404).json({ msg: error.message });
  }
  res.json(product);
  console.log(product.category[0]);
};

const editarProducto = async (req, res) => {
  let photos = [];
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    const error = new Error("Producto no encontrado");
    return res.status(404).json({ msg: error.message });
  }
  const fotos = req.files;
  fotos.forEach((element) => {
    photos.push(element.filename);
  });
  product.image = photos || product.image;
  product.name = req.body.name || product.name;
  product.description = req.body.description || product.description;
  product.brand = req.body.brand || product.brand;
  product.price = req.body.price || product.price;
  product.gender = req.body.gender || product.gender;
  product.waist.small = req.body.waist.small || product.waist.small;
  product.waist.medium = req.body.waist.medium || product.waist.medium;
  product.waist.large = req.body.waist.large || product.waist.large;
  product.waist.extraLarge =
    req.body.waist.extraLarge || product.waist.extraLarge;

  try {
    const productAlmacenado = await product.save();
    res.json(productAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const eliminarProducto = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    const error = new Error("Producto no encontrado");
    return res.status(404).json({ msg: error.message });
  }

  try {
    await product.deleteOne();
    res.json({ msg: "Producto eliminado" });
  } catch (error) {
    console.log(error);
  }
};

//AGREGAR EVENTO A PRODUCTO
const agregarEvento = async (req, res) => {
  const { id } = req.params;
  const { evento } = req.body;
  const product = await Product.findById(id);
  const event = await Event.find({ name: { $in: evento } });
  product.evento = event[0] || null;

  try {
    const productSaved = await product.save();
    res.json(productSaved);
  } catch (error) {
    console.log(error);
  }
};
//ELIMINAR EVENTO AL PRODUCTO
const eliminarEventoProducto = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  product.evento = null;

  try {
    const productSaved = await product.save();
    res.json(productSaved);
  } catch (error) {
    console.log(error);
  }
};
//-----------------------------------------SUB-CATEGORIAS--------------------------------------------//

const nuevaSubCategoria = async (req, res) => {
  const { categorieReference } = req.body;
  try {
    //Guardar un nuevo producto
    const subCategoria = new SubCategorie(req.body);
    if (categorieReference) {
      const categoriaReferencia = await Categorie.find({
        name: { $in: categorieReference },
      });
      subCategoria.categorieReference = categoriaReferencia[0];
    } else {
      const categoria = await Categorie.findOne({ name: "indumentaria" });
      subCategoria.categorieReference = categoria;
    }
    const subCategorieSaved = await subCategoria.save();
    res.json(subCategorieSaved);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const eliminarSubCategory = async (req, res) => {
  const { id } = req.params;
  const subCategoria = await SubCategorie.findById(id);
  if (!subCategoria) {
    res.json({ msg: "No existe esta Categoria" });
    return;
  }
  const products = await Product.find({ subCategory: { $in: id } });

  if (products.length > 0) {
    for (let i = 0; products.length > i; i++) {
      const product = products[i];
      await product.deleteOne();
    }
  }
  try {
    await subCategoria.deleteOne();
    res.json({ msg: "Categoria Eliminada" });
  } catch (error) {
    console.log(error);
  }
};

const obtenerSubCategorias = async (req, res) => {
  const subCategorias = await SubCategorie.find();
  try {
    res.json(subCategorias);
  } catch (error) {
    res.json(error);
  }
};

//---------------------CATEGORIAS-----------------------//
const obtenerCategorias = async (req, res) => {
  const categorias = await Categorie.find();
  try {
    res.json(categorias);
  } catch (error) {
    res.json(error);
  }
};

//-------------------------------------------EVENTOS------------------------------------//
//OBTENER LOS EVENTOS EXISTENTES
const obtenerEventos = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

//CREAR UN NUEVO EVENTO
const nuevoEvento = async (req, res) => {
  try {
    const evento = await new Event(req.body);
    await evento.save();
    res.json(evento);
  } catch (error) {
    console.log(error);
  }
};

//EDITAR EVENTO
const editarEvento = async (req, res) => {
  const { id } = req.params;
  const { name, descuento, fechaInicio, fechaFinalizar } = req.body;

  const event = await Event.findById(id);
  event.name = name || event.name;
  event.descuento = descuento || event.descuento;
  event.fechaInicio = fechaInicio || event.fechaInicio;
  event.fechaFinalizar = fechaFinalizar || event.fechaFinalizar;

  const eventoGuardado = await event.save();
  res.json(eventoGuardado);
};

//ELIMINAR EVENTO
const eliminarEvento = async (req, res) => {
  const { id } = req.params;
  const event = await Event.findById(id);
  if (!event) {
    res.json({ msg: "Evento no encontrado" });
    return;
  }

  const products = await Product.find();
  if (products.length > 0) {
    for (let i = 0; products.length > i; i++) {
      const product = products[i];
      product.evento === event._id ? null : product.evento;
      await product.save();
    }
  }

  try {
    await event.deleteOne();
    res.json({ msg: "Evento Eliminado Correctamente" });
  } catch (error) {
    console.log(error);
  }
};

//CREAR BANNER
const crearBanner = async (req, res) => {
  const banner = await new Banner(req.body);
  const fotos = req.files;

  banner.image = fotos[0].filename || banner.image;

  try {
    await banner.save();
    res.json(banner);
  } catch (error) {
    console.log(error);
  }
};

//ELIMINAR BANNER
const eliminarBanner = async (req, res) => {
  const { id } = req.params;
  const banner = await Banner.findById(id);

  try {
    await banner.deleteOne();
    res.json({ msg: "Banner eliminado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

//--------------------------------------------------PEDIDOS-------------------------------------------//

//Obtener pedidos propios del usuario
const obtenerPedidos = async (req, res) => {
  const { email } = req.usuario;
};
//Cambia el estado del pedido
const pagoConfirmado = async (req, res) => {
  const { id } = req.params;
  const orden = await Order.findById(id);

  orden.estado = "Pago Confirmado" || orden.estado;

  try {
    await orden.save();
    res.json(orden);
  } catch (error) {
    console.log(error);
  }
};
//Cancelar orden de pago
const pagoCancelado = async (req, res) => {
  const { id } = req.params;
  const orden = await Order.findById(id);
  orden.estado = "Pago Rechazado" || orden.estado;
  orden.comprobante = null || orden.comprobante;

  try {
    await orden.save();
    res.json(orden);
  } catch (error) {
    console.log(error);
  }
};

//-------------------------------------------------Metodo de PAGO------------------------------------------------------//
//Crear nuevo metodo de pago
const crearMetodoPago = async (req, res) => {
  const metodo = await new MethodsPayment(req.body);

  try {
    await metodo.save();
    res.json(metodo);
  } catch (error) {
    console.log(error);
  }
};
//Eliminar metodo de pago
const borrarMetodoPago = async (req, res) => {
  const { id } = req.params;
  const metodo = await MethodsPayment.findById(id);
  if (!metodo) {
    res.json({ msg: "Metodo no encontrado" });
    return;
  }
  try {
    await metodo.deleteOne();
    res.json({ msg: "Metodo eliminado Correctamente" });
  } catch (error) {
    console.log(error);
  }
};

//---------------------------------MARCAS-------------------------------//
//Crear una nueva marca
const nuevaMarca = async (req, res) => {
  const marca = await new Brand(req.body);

  try {
    await marca.save();
    res.json(marca);
  } catch (error) {
    console.log(error);
  }
};

const obtenerMarcas = async (req, res) => {
  const marcas = await Brand.find();

  try {
    res.json(marcas);
  } catch (error) {
    console.log(error);
  }
};

const obtenerMarca = async (req, res) => {
  const { id } = req.params;
  const marca = await Brand.findById(id);

  try {
    res.json(marca);
  } catch (error) {
    console.log(error);
  }
};

const editarMarca = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  const marca = await Brand.findById(id);

  marca.nombre = nombre || marca.nombre;

  try {
    await marca.save();
    res.json(marca);
  } catch (error) {
    console.log(error);
  }
};

const eliminarMarca = async (req, res) => {
  const { id } = req.params;
  const marca = await Brand.findById(id);

  try {
    await marca.deleteOne();
    res.json({ msg: "Eliminado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

export {
  newProduct,
  obtenerProducto,
  editarProducto,
  eliminarProducto,
  nuevaSubCategoria,
  eliminarSubCategory,
  obtenerPedidos,
  pagoConfirmado,
  pagoCancelado,
  obtenerEventos,
  nuevoEvento,
  agregarEvento,
  eliminarEventoProducto,
  editarEvento,
  eliminarEvento,
  crearMetodoPago,
  borrarMetodoPago,
  crearBanner,
  eliminarBanner,
  nuevaMarca,
  obtenerMarcas,
  obtenerMarca,
  editarMarca,
  eliminarMarca,
  obtenerSubCategorias,
  obtenerCategorias,
};
