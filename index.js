import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from './config/db.js';

//Multer
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

//ROUTES
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';

import { createRoles, createCategories } from './libs/initialSetup.js';

const app = express();
createRoles();
createCategories();
app.use(express.json());
dotenv.config();
conectarDB();

/*
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      //Puede consultar la API
      callback(null, true);
    } else {
      //Caso contrario, NO esta permitido su REQUEST
      callback(new Error('Error de CORS'));
    }
  },
};
*/

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//Config Multer
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/images'),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/ /g, '')}`);
  },
});

app.use(
  multer({
    storage,
    fileFilter(req, file, cb) {
      cb(null, true);
    },
  }).array('image')
);

app.use('/', productRoutes);

app.use('/auth', authRoutes);

app.use('/user', userRoutes);

app.use('/admin', adminRoutes);

//PUBLIC
app.use(express.static('public'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor conectado en el puerto: ${PORT}`);
});
