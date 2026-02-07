const express = require('express');
const router = express.Router();
const {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart
} = require('../controllers/cartController');
const {
  validateCartId,
  validateCartItem,
  validateQuantityUpdate
} = require('../middleware/validation');

// Add item to cart (create cart if doesn't exist)
router.post('/', validateCartItem, addToCart);

// Get cart contents
router.get('/:cartId', validateCartId, getCart);

// Update item quantity
router.put('/:cartId/items/:productId', validateCartId, validateQuantityUpdate, updateCartItem);

// Remove item from cart
router.delete('/:cartId/items/:productId', validateCartId, removeCartItem);

// Clear entire cart
router.delete('/:cartId', validateCartId, clearCart);

module.exports = router;
