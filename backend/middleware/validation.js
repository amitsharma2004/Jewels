const mongoose = require('mongoose');
const Product = require('../models/Product');
const { errorResponse } = require('../utils/responseHelper');

// Validate cart ID format
const validateCartId = (req, res, next) => {
  const { cartId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cartId)) {
    return errorResponse(res, 400, 'Invalid cart ID format', 'Please provide a valid cart ID');
  }

  next();
};

// Validate cart item (product exists, quantity valid, stock available)
const validateCartItem = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    // Check if productId is provided and valid
    if (!productId) {
      return errorResponse(res, 400, 'Product ID is required', 'Please provide a product ID');
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return errorResponse(res, 400, 'Invalid product ID format', 'Please provide a valid product ID');
    }

    // Check if quantity is valid
    if (!quantity || quantity <= 0) {
      return errorResponse(res, 400, 'Invalid quantity', 'Quantity must be greater than 0');
    }

    if (!Number.isInteger(quantity)) {
      return errorResponse(res, 400, 'Invalid quantity', 'Quantity must be a whole number');
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return errorResponse(res, 404, 'Product not found', `No product found with ID: ${productId}`);
    }

    // Check if product is in stock
    if (!product.inStock) {
      return errorResponse(res, 400, 'Product out of stock', `${product.name} is currently unavailable`);
    }

    // Check if sufficient stock available
    if (quantity > product.stock) {
      return errorResponse(res, 400, 'Insufficient stock', `Only ${product.stock} units available for ${product.name}`);
    }

    // Attach product to request for use in controller
    req.product = product;
    next();
  } catch (error) {
    next(error);
  }
};

// Validate quantity update
const validateQuantityUpdate = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;

    // Check if quantity is provided
    if (quantity === undefined || quantity === null) {
      return errorResponse(res, 400, 'Quantity is required', 'Please provide a quantity value');
    }

    // Allow 0 for removal
    if (quantity < 0) {
      return errorResponse(res, 400, 'Invalid quantity', 'Quantity cannot be negative');
    }

    if (!Number.isInteger(quantity)) {
      return errorResponse(res, 400, 'Invalid quantity', 'Quantity must be a whole number');
    }

    // If quantity > 0, validate stock
    if (quantity > 0) {
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return errorResponse(res, 400, 'Invalid product ID format', 'Please provide a valid product ID');
      }

      const product = await Product.findById(productId);
      if (!product) {
        return errorResponse(res, 404, 'Product not found', `No product found with ID: ${productId}`);
      }

      if (quantity > product.stock) {
        return errorResponse(res, 400, 'Insufficient stock', `Only ${product.stock} units available for ${product.name}`);
      }

      req.product = product;
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateCartId,
  validateCartItem,
  validateQuantityUpdate
};
