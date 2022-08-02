import mongoose from 'mongoose';

const subCategorieSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    categorieReference: {
      ref: 'Categorie',
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    versionKey: false,
  }
);

const SubCategorie = mongoose.model('SubCategorie', subCategorieSchema);
export default SubCategorie;
