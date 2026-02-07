import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartId: localStorage.getItem('cartId') || null,
  items: [],
  totalAmount: 0,
  loading: false,
  error: null
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartId: (state, action) => {
      state.cartId = action.payload;
      localStorage.setItem('cartId', action.payload);
    },
    setCart: (state, action) => {
      state.items = action.payload.items || [];
      state.totalAmount = action.payload.totalAmount || 0;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.error = null;
    },
    clearCartId: (state) => {
      state.cartId = null;
      localStorage.removeItem('cartId');
    }
  }
});

export const { setCartId, setCart, setLoading, setError, clearCart, clearCartId } = cartSlice.actions;
export default cartSlice.reducer;
