import mongoose from 'mongoose';

const methordPaymentSchema = mongoose.Schema(
  {
    nombreMetodo: {
      type: String,
      required: true,
      trim: true,
    },
    nombreCuenta: {
      type: String,
      required: true,
      trim: true,
    },
    banco: {
      type: String,
      required: true,
      trim: true,
    },
    cbu: {
      type: Number,
      required: true,
      trim: true,
    },
    cuit: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const MethodsPayment = mongoose.model('MethodsPayment', methordPaymentSchema);
export default MethodsPayment;
