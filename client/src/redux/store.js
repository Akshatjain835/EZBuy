import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authslice/authSlice.js";
import adminProductsSlice from './admin/adminProductSlice.js'
import shopProductsSlice from './shop/shoppingProductSlice.js'

const store = configureStore({
    reducer: {
      auth: authReducer,
      adminProducts:adminProductsSlice,
      shopProducts:shopProductsSlice,
      
    },
  });
  
  export default store;