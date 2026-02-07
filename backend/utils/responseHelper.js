const successResponse = (res, statusCode, data, message = 'Success') => {
  return res.status(statusCode).json({
    success: true,
    data,
    message,
    error: null
  });
};

const errorResponse = (res, statusCode, message, error = null) => {
  return res.status(statusCode).json({
    success: false,
    data: null,
    message,
    error
  });
};

module.exports = { successResponse, errorResponse };
