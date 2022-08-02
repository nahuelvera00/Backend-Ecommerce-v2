import mongoose from 'mongoose';

const eventSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    descuento: {
      type: Number,
      required: true,
    },
    fechaInicio: {
      type: Date,
      default: Date.now(),
    },
    fechaFinalizar: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const Event = mongoose.model('Event', eventSchema);
export default Event;
