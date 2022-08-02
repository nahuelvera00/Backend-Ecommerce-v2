import User from '../models/Users.js';
import Role from '../models/Role.js';
import generarId from '../helpers/generarId.js';
import generarJWT from '../helpers/generarJWT.js';
import { emailRegistro, emailOlvidePassword } from '../helpers/email.js';

const registrar = async (req, res) => {
  const { email } = req.body;
  const { roles } = req.body;
  const { username } = req.body;
  const existeUsuario = await User.findOne({ email: email });

  if (existeUsuario) {
    const error = new Error('Usuario ya registrado');
    return res.status(400).json({ msg: error.message });
  }

  const nombreUtilizado = await User.findOne({ username: username });
  if (nombreUtilizado) {
    const error = new Error('El Nombre de Usuario ya esta en uso');
    return res.status(400).json({ msg: error.message });
  }

  try {
    const usuario = new User(req.body);
    usuario.token = generarId();

    if (roles) {
      const rolUser = await Role.find({ name: { $in: roles } });
      usuario.roles = rolUser.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: 'user' });
      usuario.roles = [role._id];
    }
    const savedUser = await usuario.save();
    //Enviar Email de confirmacion
    emailRegistro({
      email: usuario.email,
      nombre: usuario.nombre,
      token: usuario.token,
    });
    res.json({
      msg: 'Usuario Creado Correctamente, Revisa tu Email para confirmar tu cuenta',
    });
  } catch (error) {
    res.json({
      msg: 'error',
    });
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;

  //Comprobar si el usuario existe
  const usuario = await User.findOne({ email }).populate('roles');
  if (!usuario) {
    const error = new Error('Usuario no Existe');
    return res.status(404).json({ msg: error.message });
  }

  //Comprobar si el usuario esta confirmado
  if (!usuario.confirmado) {
    const error = new Error('Cuenta no Confirmada');
    return res.status(403).json({ msg: error.message });
  }

  //Comprobar el password
  if (await usuario.comprobarPassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.username,
      email: usuario.email,
      token: generarJWT(usuario._id, usuario.roles[0]),
      rol: usuario.roles[0].name,
    });
  } else {
    const error = new Error('Contraseña Incorrecta');
    return res.status(404).json({ msg: error.message });
  }
};

const confirmar = async (req, res) => {
  const { token } = req.params;
  const usuarioConfirmar = await User.findOne({ token });

  if (!usuarioConfirmar) {
    const error = new Error('Token no Valido');
    return res.status(403).json({ msg: error.message });
  }

  try {
    usuarioConfirmar.confirmado = true;
    usuarioConfirmar.token = '';
    await usuarioConfirmar.save();
    res.json({ msg: 'Usuario confirmado correctamente' });
  } catch (error) {
    console.log(error);
  }
};

const olvidePassword = async (req, res) => {
  const { email } = req.body;
  const usuario = await User.findOne({ email });
  if (!usuario) {
    const error = new Error('El Usuario no Existe');
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuario.token = generarId();
    await usuario.save();
    //Enviar email para restaurar contraseña
    emailOlvidePassword({
      email: usuario.email,
      nombre: usuario.nombre,
      token: usuario.token,
    });

    res.json({ msg: 'Hemos enviado un email con las Instrucciones' });
  } catch (error) {
    console.log(error);
  }
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;

  const tokenValido = await User.findOne({ token });

  if (tokenValido) {
    res.json({ msg: 'Token valido, el usuario existe' });
  } else {
    const error = new Error('Token no valido');
    return res.status(404).json({ msg: error.message });
  }
};

const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const usuario = await User.findOne({ token });

  if (usuario) {
    usuario.password = password;
    usuario.token = '';
    try {
      await usuario.save();
      res.json({ msg: 'Se restablecio correctamente tu contraseña' });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error('Token no valido');
    return res.status(404).json({ msg: error.message });
  }
};

const perfil = async (req, res) => {
  const { usuario } = req;
  const rol = await Role.findById(usuario.roles[0]);

  res.json({ usuario, rol: rol.name });
};

export {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
};
