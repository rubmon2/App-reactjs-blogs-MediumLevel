export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;

  // Reemplaza caracteres peligrosos
  return input
    .replace(/<script.*?>.*?<\/script>/gi, '') // Remueve scripts
    .replace(/[<>]/g, '') // Remueve < y >
    .replace(/['"`;]/g, ''); // Remueve comillas simples, dobles y punto y coma
};

export const sanitizeInteger = (input) => {
  // Convierte el valor a número entero si es válido
  const parsedInput = parseInt(input, 10);

  // Verifica si el valor es un número entero válido
  if (isNaN(parsedInput) || !Number.isInteger(parsedInput)) {
    throw new Error('El ID proporcionado no es válido.');
  }

  return parsedInput; // Devuelve el número entero
};
