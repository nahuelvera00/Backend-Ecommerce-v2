import express from 'express';

import {
  editarProducto,
  newProduct,
  obtenerProducto,
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
} from '../controllers/adminController.js';
import { checkAuth, isAdmin } from '../middlewares/checkAuth.js';

const router = express.Router();
//----------------------------------------------------PRODUCTOS-------------------------------------------------
router.post('/new-product', [checkAuth, isAdmin], newProduct);
router.get('/product/:id', [checkAuth, isAdmin], obtenerProducto);
router.put('/product/:id', [checkAuth, isAdmin], editarProducto);
router.delete('/product/:id', [checkAuth, isAdmin], eliminarProducto);
//AGREGAR EVENTO A LOS PRODUCTOS
router.put('/products/add-event/:id', [checkAuth, isAdmin], agregarEvento);
//ELIMINAR EVENTO A LOS PRODUCTOS
router.put(
  '/products/delete-event/:id',
  [checkAuth, isAdmin],
  eliminarEventoProducto
);

//---------------------------MARCAS-------------------------------//
router.post('/brands/new-brand', [checkAuth, isAdmin], nuevaMarca);

router.get('/brands', [checkAuth, isAdmin], obtenerMarcas);

router.get('/brands/:id', [checkAuth, isAdmin], obtenerMarca);

router.put('/brand/:id', [checkAuth, isAdmin], editarMarca);

router.delete('/brands/:id', [checkAuth, isAdmin], eliminarMarca);

//---------SUBCATEGORIES INDUMENTARIA:buzo-remera-pantalon,etc Calzado: urbana - deportiva ARTICULOS: reloj - pulseras, etc--
router.post('/sub-category/new', [checkAuth, isAdmin], nuevaSubCategoria);
//eliminar SUB-CATEGORY
router.delete('/sub-category/:id', [checkAuth, isAdmin], eliminarSubCategory);
//obtener sub-categorias
router.get('/sub-categories', [checkAuth, isAdmin], obtenerSubCategorias);

//OBTENER CATEGORIAS
router.get('/categories', [checkAuth, isAdmin], obtenerCategorias);

//------------------------------------------------EVENTOS- DESCUENTOS - ETC------------------------------------

//OBTENER Y CREAR EVENTOS
router
  .route('/events')
  .get([checkAuth, isAdmin], obtenerEventos)
  .post([checkAuth, isAdmin], nuevoEvento);

//EDITAR EVENTO
router.put('/events/:id', [checkAuth, isAdmin], editarEvento);

//ELIMINAR EVENTOS
router.delete('/events/:id', [checkAuth, isAdmin], eliminarEvento);

//Crear Banner
router.post('/events/new-banner', [checkAuth, isAdmin], crearBanner);
//Eliminar Banner
router.delete('/events/banner/:id', [checkAuth, isAdmin], eliminarBanner);

//-----------------------------------------PEDIDOS/ PEDIDOS PENDIENTES/ EN CAMINO/-----------------------------------

router.get('/orders', [checkAuth, isAdmin], obtenerPedidos);

//confirmar pago
router.put('/orders/:id', [checkAuth, isAdmin], pagoConfirmado);

//cancelar pago
router.post('/orders/:id', [checkAuth, isAdmin], pagoCancelado);

//----------------------------------------------METODOS DE PAGO-----------------------------------------------//

//Crear metodo de pago
router.post('/methods-payment', [checkAuth, isAdmin], crearMetodoPago);
router.delete('/methods-payment/:id', [checkAuth, isAdmin], borrarMetodoPago);

//--------------------------------------------INICIO-------------------------------------------------------

export default router;
