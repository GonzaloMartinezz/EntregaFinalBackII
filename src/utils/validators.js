const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const isValidPassword = (password) => {
  return password && password.length >= 6;
};

const isValidString = (str) => {
  return typeof str === 'string' && str.trim().length > 0;
};

const successResponse = (data, message = 'Operación exitosa') => {
  return {
    success: true,
    message,
    payload: data,
  };
};

const errorResponse = (error, statusCode = 400) => {
  return {
    success: false,
    error: error.message || error,
    statusCode,
  };
};

const getPagination = (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return { skip, limit: parseInt(limit) };
};

module.exports = {
  isValidEmail,
  isValidPassword,
  isValidString,
  successResponse,
  errorResponse,
  getPagination,
};
