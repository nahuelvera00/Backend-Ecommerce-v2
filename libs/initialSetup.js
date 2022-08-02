import Role from '../models/Role.js';
import Categorie from '../models/Categories.js';

export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count > 0) return;

    const values = await Promise.all([
      new Role({ name: 'user' }).save(),
      new Role({ name: 'admin' }).save(),
    ]);
  } catch (error) {
    console.log(error);
  }
};

export const createCategories = async () => {
  try {
    const count = await Categorie.estimatedDocumentCount();
    if (count > 0) return;
    const values = await Promise.all([
      new Categorie({ name: 'indumentaria' }).save(),
      new Categorie({ name: 'calzado' }).save(),
      new Categorie({ name: 'accesorios' }).save(),
    ]);
  } catch (error) {
    console.log(error);
  }
};
