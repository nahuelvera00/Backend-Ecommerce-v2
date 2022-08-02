import mongoose from 'mongoose';

const roleSchema = mongoose.Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

const Product = mongoose.model('Role', roleSchema);
export default Product;
