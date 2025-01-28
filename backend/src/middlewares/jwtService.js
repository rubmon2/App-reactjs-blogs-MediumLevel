import jwt from 'jsonwebtoken';

const AccesToken = process.env.SECRET_WORDS || 'secretwords';
const RefreshToken = process.env.REFRESH_WORDS || 'secretRefresh';

const createToken = (user, renovacion) => {
  const payload = { id: user.id, email: user.email };

  return jwt.sign(payload, renovacion ? AccesToken : RefreshToken, {
    expiresIn: renovacion ? '30m' : '168h',
  });
};

export const createAccesToken = (user) => {
  return createToken(user, true);
};

export const createRefreshToken = (user) => {
  return createToken(user, false);
};

export const compareToken = (token) => {
  try {
    const decodded = jwt.verify(token, RefreshToken);
    return decodded;
  } catch (error) {
    console.log(error);
    if (error.name === 'TokenExpiredError') {
      throw new Error('Sesion expirada, vuelvete a loguear');
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('Autorizacion invalida');
    } else {
      throw new Error('Error al verificar la autorizacion');
    }
  }
};
