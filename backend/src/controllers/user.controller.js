import { comparePassword, createHash } from '../middlewares/authService.js';
import { createRefreshToken } from '../middlewares/jwtService.js';
import { userModel } from '../models/relationships.js';
import { tokenModel } from '../models/token.model.js';

export const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      res.status(400).json({ message: 'Complete all failed pls' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: 'El formato del correo es inválido' });
    }

    const savePassword = await createHash(password);

    const user = await userModel.create({
      username,
      email,
      password: savePassword,
    });

    if (!user) {
      res
        .status(404)
        .json({ message: 'Cannot Create User, pls check field and try again' });
      return;
    }

    const payload = { unsername: user.username, emial: user.email };
    res.status(201).json({ message: 'user create', user: payload });
  } catch (error) {
    console.log(error);

    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ message: 'Usuario ya existente, elige otro' });
    }
    res
      .status(400)
      .json({ message: 'Error en register', error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({ message: 'Complete all field' });
      return;
    }

    const user = await userModel.findOne({ where: { email: email } });
    if (!user) {
      res.status(404).json({ message: 'User or password incorrect' });
      return;
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      res
        .status(404)
        .json({ message: 'User or password incorrect', error: error.menssage });
      return;
    }

    const refreshToken = createRefreshToken(user);

    const saveToken = await tokenModel.create({ token: refreshToken });

    if (!saveToken) {
      return res.status(400).json({
        message:
          'El usuario no pudo loguearse, verifique que al registrarlo los caracteres no sean especiales',
      });
    }

    res.status(200).json({ token: refreshToken });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Error en server, logueando usuario',
      error: error.menssage,
    });
  }
};

export const logoutUSer = async (req, res) => {
  try {
    res.send({ message: 'user logout init' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error en server, deslogueando usuario' });
  }
};

export const profileUser = async (req, res) => {
  try {
    const user = req.user;
    console.log('check auth correcto');
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'Error en server, en el perfil del  usuario' });
  }
};
