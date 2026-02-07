const Product = require('../models/Product');
const { successResponse, errorResponse } = require('../utils/responseHelper');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    
    if (products.length === 0) {
      return successResponse(res, 200, [], 'No products found');
    }

    return successResponse(res, 200, products, `Found ${products.length} products`);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return errorResponse(res, 404, 'Product not found', `No product with ID: ${req.params.id}`);
    }

    return successResponse(res, 200, product, 'Product retrieved successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById
};
