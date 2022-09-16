import Order from "../models/Orders.js";
import Product from "../models/Product.js";
import MethodsPayment from "../models/MethodPayment.js";

const nuevaOrden = async (req, res) => {
  const { order, total, datosEnvio, metodoPago } = req.body;
  console.log(total);
  //Asignar Datos de Pago
  const metodo = await MethodsPayment.findById(metodoPago);
  const orden = [];
  if (order.length > 0) {
    for (let i = 0; order.length > i; i++) {
      const producto = await Product.findById(order[i].product);
      if (!producto) {
        return res.json("Productos no Encontrado");
      }
      const product = {
        name: producto.name,
        id: producto._id,
        precio: producto.price,
        talle: order[i].talle,
      };
      orden.push(product);
    }
  }

  const nuevaOrden = await new Order(req.body);
  nuevaOrden.usuario = req.usuario._id;
  nuevaOrden.orden = orden;
  //HACER CONSULTA DEL COSTO DE ENVIO
  nuevaOrden.total = total;

  nuevaOrden.metodoDePago.metodo =
    metodo.nombreMetodo || nuevaOrden.metodoDePago.metodo;
  nuevaOrden.metodoDePago.nombreCuenta =
    metodo.nombreCuenta || nuevaOrden.metodoDePago.nombreCuenta;
  nuevaOrden.metodoDePago.banco = metodo.banco || nuevaOrden.metodoDePago.banco;
  nuevaOrden.metodoDePago.cbu = metodo.cbu || nuevaOrden.metodoDePago.cbu;
  nuevaOrden.metodoDePago.cuit = metodo.cuit || nuevaOrden.metodoDePago.cuit;

  await nuevaOrden.save();
  console.log(nuevaOrden);
  res.json({ nuevaOrden });
};

const pagarOrden = async (req, res) => {
  const { id } = req.params;
  const comprobante = req.files;
  const orden = await Order.findById(id);

  orden.estado = "Pago a Confirmar" || orden.estado;
  orden.comprobante = comprobante[0].filename || orden.comprobante;

  try {
    await orden.save();
    res.json(orden);
  } catch (error) {
    console.log(error);
  }
};

const cancelarOrden = async (req, res) => {
  const { id } = req.params;
  const orden = await Order.findById(id);

  //autenticar que sea el usuario
  if (!orden) {
    res.json({ msg: "Orden no encontrada" });
    return;
  }
  if (orden.usuario.toString() !== req.usuario._id.toString()) {
    res.json({ msg: "Accion no Valida" });
    return;
  }
  //Eliminar

  try {
    await orden.deleteOne();
    res.json({ msg: "Pedido Eliminado Correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const obtenerOrdenes = async (req, res) => {
  const { _id } = req.usuario;
  const ordenes = await Order.find({ usuario: { $in: _id } });
  if (!ordenes) {
    res.json({ msg: "No se encontraron Pedidos" });
    return;
  }
  res.json(ordenes);
};

export { nuevaOrden, pagarOrden, cancelarOrden, obtenerOrdenes };
