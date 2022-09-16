import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orden: [
      {
        id: String,
        nombre: String,
        talle: String,
        precio: Number,
      },
    ],
    fechaCompra: {
      type: Date,
      default: Date.now(),
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    datosUsuario: {
      nombre: String,
      apellido: String,
      dni: Number,
      email: String,
    },
    datosEnvio: {
      calle: String,
      numero: Number,
      codigoPostal: Number,
      costo: Number,
    },
    metodoDePago: {
      metodo: {
        type: String,
        trim: true,
        default: "",
      },
      nombreCuenta: {
        type: String,
        trim: true,
        default: "",
      },
      banco: {
        type: String,
        trim: true,
        default: "",
      },
      cbu: {
        type: Number,
        trim: true,
        default: 0,
      },
      cuit: {
        type: String,
        trim: true,
        default: "",
      },
    },
    estado: {
      type: String,
      default: "Pago Pendiente",
    },
    comprobante: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
