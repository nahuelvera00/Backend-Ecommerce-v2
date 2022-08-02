import mongoose from 'mongoose';

const brandsSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const Brand = mongoose.model('Brand', brandsSchema);
export default Brand;
