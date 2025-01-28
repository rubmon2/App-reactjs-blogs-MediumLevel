import bcrypt from 'bcryptjs';

const SALT_ROUND = 10;

export const createHash = async (password) => {
  if (!password || password.length < 5 || password.length > 45) {
    throw new Error(' la contraseña tiene que tener entre 5 a 45 de longitud');
  }
  try {
    const response = await bcrypt.hash(password, SALT_ROUND);
    if (!response) {
      throw new Error('Error al crear la contraseña ');
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (password, hashed) => {
  const response = await bcrypt.compare(password, hashed);
  if (!response) {
    throw new Error('Passwor or User not found');
  }
  return response;
};
