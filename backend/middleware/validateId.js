const mongoose = require('mongoose');
const { errorResponse } = require('../utils/responseHelper');

const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return errorResponse(res, 400, 'Invalid ID format', 'Please provide a valid MongoDB ObjectId');
  }

  next();
};

module.exports = validateId;
