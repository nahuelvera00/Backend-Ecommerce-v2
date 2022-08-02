import nodemailer from 'nodemailer';

export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  //Informacion del email
  const info = await transport.sendMail({
    from: `"UpTask - Administrador de Proyectos" <cuentas@uptask.com>`,
    to: email,
    subject: 'UpTask - Confirmacion de Cuenta',
    text: 'Confirma tu Cuenta de UpTask',
    html: `<p>Hola: ${nombre}, Comprueba tu cuenta en UpTask</p>
        <p>Tu cuenta ya esta casi lista, solo debemos Verificarla en el proximo Enlace:
        <a href="${process.env.FRONTEND_URL}/auth/confirmar/${token}">Verificar Aqui</a>
        `,
  });
};

export const emailOlvidePassword = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  //Informacion del email
  const info = await transport.sendMail({
    from: `"UpTask - Administrador de Proyectos" <cuentas@uptask.com>`,
    to: email,
    subject: 'UpTask - Restablece tu Contraseña',
    text: 'Restablece tu contraseña',
    html: `<p>Hola: ${nombre}, Restabelce tu contraseña de UpTask</p>
        <p>Restablece tu contraseña de UpTask en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer Contraseña</a>
        <p>Si tu no solicitaste cambiar tu contraseña, puedes ignorar este mensaje</p>
        `,
  });
};
