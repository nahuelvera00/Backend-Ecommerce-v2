import express from 'express';
import {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
} from '../controllers/authController.js';
import { checkAuth } from '../middlewares/checkAuth.js';

const router = express.Router();

router.post('/register', registrar);

router.post('/login', autenticar);

router.get('/confirm/:token', confirmar);
router.post('/forget-password', olvidePassword);
router.route('/forget-password/:token').get(comprobarToken).post(nuevoPassword);
router.get('/perfil', checkAuth, perfil);

export default router;
