import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authslice/authSlice.js";
import adminProductsSlice from './admin/adminProductSlice.js'

const store = configureStore({
    reducer: {
      auth: authReducer,
      adminProducts:adminProductsSlice,
      
    },
  });
  
  export default store;