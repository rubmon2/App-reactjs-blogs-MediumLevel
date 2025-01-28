import { tokenModel } from '../models/token.model.js';
import { userModel } from '../models/user.model.js';
import { compareToken, createAccesToken } from './jwtService.js';

export const checkAuth = async (req, res, next) => {
  const headers = req.headers.authorization;
  try {
    if (!headers) {
      res
        .status(404)
        .json({ message: 'no existe autorizacion, necesita loguearse' });
      return;
    }

    const [prefix, token] = headers.trim().replace(/['"]+/g, '').split(' ');

    if (prefix !== 'Bearer') {
      res.status(401).json({ message: 'la autorizacion es incorrecta' });
      return;
    }

    if (!token) {
      res.status(401).json({
        message: 'la autorizacion vencio o no existe, loguese por favor',
      });
      return;
    }

    const user = compareToken(token);
    const userFound = await userModel.findOne({ where: { email: user.email } });
    if (!userFound) {
      res
        .status(404)
        .json({ message: 'La autorizacion no coincide, vuelve a loguearte' });
      return;
    }

    const tokenExist = await tokenModel.findOne({ where: { token: token } });
    if (!tokenExist) {
      return res.status(404).json({
        message: 'El permiso no coincide con los registrados',
        acces: false,
      });
    }
    const payload = { id: userFound.id, username: userFound.username };
    const AccesToken = createAccesToken(userFound);

    req.user = { payload, acces: AccesToken };
    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({
      message: 'Necesita loguarse para tener autorizacion',
      error: error.message,
    });
  }
};
