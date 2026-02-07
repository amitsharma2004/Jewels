import api from './api';

export const productService = {
  getAllProducts: async () => {
    return await api.get('/products');
  },

  getProductById: async (id) => {
    return await api.get(`/products/${id}`);
  }
};

export default productService;
