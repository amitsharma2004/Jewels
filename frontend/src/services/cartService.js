import api from './api';

export const cartService = {
  addToCart: async (cartId, productId, quantity) => {
    return await api.post('/cart', { cartId, productId, quantity });
  },

  getCart: async (cartId) => {
    return await api.get(`/cart/${cartId}`);
  },

  updateCartItem: async (cartId, productId, quantity) => {
    return await api.put(`/cart/${cartId}/items/${productId}`, { quantity });
  },

  removeCartItem: async (cartId, productId) => {
    return await api.delete(`/cart/${cartId}/items/${productId}`);
  },

  clearCart: async (cartId) => {
    return await api.delete(`/cart/${cartId}`);
  }
};

export default cartService;
