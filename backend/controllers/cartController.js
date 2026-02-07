const Cart = require('../models/Cart');
const { successResponse, errorResponse } = require('../utils/responseHelper');

// @desc    Add item to cart (create cart if doesn't exist)
// @route   POST /api/cart
// @access  Public
const addToCart = async (req, res, next) => {
  try {
    const { cartId, productId, quantity } = req.body;
    const product = req.product; // Attached by validation middleware

    let cart;

    // If cartId provided, find existing cart
    if (cartId) {
      cart = await Cart.findById(cartId);
      if (!cart) {
        return errorResponse(res, 404, 'Cart not found', `No cart found with ID: ${cartId}`);
      }
    } else {
      // Create new cart
      cart = new Cart({ items: [] });
    }

    // Check if product already in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Update quantity of existing item
      const newQuantity = cart.items[existingItemIndex].quantity + quantity;
      
      // Check if new quantity exceeds stock
      if (newQuantity > product.stock) {
        return errorResponse(
          res, 
          400, 
          'Insufficient stock', 
          `Cannot add ${quantity} more. Only ${product.stock - cart.items[existingItemIndex].quantity} units available`
        );
      }

      cart.items[existingItemIndex].quantity = newQuantity;
    } else {
      // Add new item to cart
      cart.items.push({
        productId,
        quantity,
        priceAtAdd: product.price
      });
    }

    await cart.save();
    await cart.populate('items.productId');

    return successResponse(res, 200, cart, 'Item added to cart successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Get cart contents
// @route   GET /api/cart/:cartId
// @access  Public
const getCart = async (req, res, next) => {
  try {
    const { cartId } = req.params;

    const cart = await Cart.findById(cartId).populate('items.productId');

    if (!cart) {
      return errorResponse(res, 404, 'Cart not found', `No cart found with ID: ${cartId}`);
    }

    return successResponse(res, 200, cart, 'Cart retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Update item quantity in cart
// @route   PUT /api/cart/:cartId/items/:productId
// @access  Public
const updateCartItem = async (req, res, next) => {
  try {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findById(cartId);

    if (!cart) {
      return errorResponse(res, 404, 'Cart not found', `No cart found with ID: ${cartId}`);
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return errorResponse(res, 404, 'Item not found in cart', `Product not found in cart`);
    }

    // If quantity is 0, remove item
    if (quantity === 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();
    await cart.populate('items.productId');

    return successResponse(res, 200, cart, 'Cart updated successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:cartId/items/:productId
// @access  Public
const removeCartItem = async (req, res, next) => {
  try {
    const { cartId, productId } = req.params;

    const cart = await Cart.findById(cartId);

    if (!cart) {
      return errorResponse(res, 404, 'Cart not found', `No cart found with ID: ${cartId}`);
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return errorResponse(res, 404, 'Item not found in cart', `Product not found in cart`);
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();
    await cart.populate('items.productId');

    return successResponse(res, 200, cart, 'Item removed from cart successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Clear entire cart
// @route   DELETE /api/cart/:cartId
// @access  Public
const clearCart = async (req, res, next) => {
  try {
    const { cartId } = req.params;

    const cart = await Cart.findById(cartId);

    if (!cart) {
      return errorResponse(res, 404, 'Cart not found', `No cart found with ID: ${cartId}`);
    }

    cart.items = [];
    await cart.save();

    return successResponse(res, 200, cart, 'Cart cleared successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart
};
