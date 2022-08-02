import mongoose from 'mongoose';

const categorieSchema = mongoose.Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

const Categorie = mongoose.model('Categorie', categorieSchema);
export default Categorie;
