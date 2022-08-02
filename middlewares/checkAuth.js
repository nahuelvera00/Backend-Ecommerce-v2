import jwt from 'jsonwebtoken';
import User from '../models/Users.js';
import Role from '../models/Role.js';

export const checkAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.usuario = await User.findById(decoded.id).select(
        '-password -confirmado -token -createdAt -updatedAt -__v'
      );
      return next();
    } catch (error) {
      return res.status(404).json({ msg: 'Hubo un error' });
    }
  }

  if (!token) {
    const error = new Error('Token no valido');
    return res.status(401).json({ msg: error.message });
  }

  next();
};

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.usuario);
  const roles = await Role.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === 'admin') {
      next();
    } else if (roles[i].name === 'user') {
      return res.status(403).json({ msg: 'No tienes los permisos necesarios' });
    }
  }
};
