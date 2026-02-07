const { errorResponse } = require('../utils/responseHelper');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(e => e.message).join(', ');
    return errorResponse(res, 400, 'Validation Error', message);
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === 'CastError') {
    return errorResponse(res, 400, 'Invalid ID format', err.message);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return errorResponse(res, 400, 'Duplicate field value', 'Resource already exists');
  }

  // Default error
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  
  return errorResponse(res, statusCode, message, process.env.NODE_ENV === 'development' ? err.stack : null);
};

module.exports = errorHandler;
