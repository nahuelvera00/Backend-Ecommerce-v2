import mongoose from 'mongoose';

const bannerSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default: null,
      trim: true,
    },
    fechaCreacion: {
      type: Date,
      default: Date.now(),
    },
    fechaFinalizacion: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const Banner = mongoose.model('Banner', bannerSchema);
export default Banner;
