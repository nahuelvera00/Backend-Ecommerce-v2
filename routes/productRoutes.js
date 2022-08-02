import express from 'express';

import { getProducts, getProduct } from '../controllers/productController.js';
import { checkAuth, isAdmin } from '../middlewares/checkAuth.js';

const router = express.Router();

router.get('/products', getProducts);
router.get('/product/:id', getProduct);

export default router;
