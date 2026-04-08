import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import serviceReducer from './slices/serviceSlice';
import productReducer from './slices/productSlice';
import rentalReducer from './slices/rentalSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    service: serviceReducer,
    product: productReducer,
    rental: rentalReducer,
    cart: cartReducer,
  },
});
