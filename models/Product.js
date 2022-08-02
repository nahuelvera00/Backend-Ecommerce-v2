import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  image: [
    {
      type: String,
      default: null,
    },
  ],
  brand: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
    trim: true,
  },
  subCategory: {
    ref: 'SubCategorie',
    type: mongoose.Schema.Types.ObjectId,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
  },
  waist: {
    small: {
      type: Number,
      required: true,
      default: 0,
    },
    medium: {
      type: Number,
      required: true,
      default: 0,
    },
    large: {
      type: Number,
      required: true,
      default: 0,
    },
    extraLarge: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  evento: {
    ref: 'Event',
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
});

const Product = mongoose.model('Product', productSchema);
export default Product;
