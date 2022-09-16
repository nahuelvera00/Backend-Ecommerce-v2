import express from "express";

//CONTROLLER
import {
  nuevaOrden,
  pagarOrden,
  cancelarOrden,
  obtenerOrdenes,
} from "../controllers/userController.js";
//AUTH
import { checkAuth } from "../middlewares/checkAuth.js";
//ROUTER
const router = express.Router();

//-----------------------------------------------PEDIDOS-----------------------------------------------------------------
//obtener pedidos
router.get("/orders", checkAuth, obtenerOrdenes);
//crear pedido
router.post("/orders/new-order", checkAuth, nuevaOrden);

//pagar pedido
router.put("/orders/:id", checkAuth, pagarOrden);

//Cancelar Orden
router.delete("/orders/:id", checkAuth, cancelarOrden);

export default router;
