import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authslice/authSlice.js";
import adminProductsSlice from './admin/adminProductSlice.js'
import shopProductsSlice from './shop/shoppingProductSlice.js'
import shopCartSlice from './shop/shoppingCartSlice.js'
import shopAddressSlice from "./shop/shoppingAddressSlice.js";
import shopOrderSlice from "./shop/shoppingOrderSlice.js";

const store = configureStore({
    reducer: {
      auth: authReducer,
      adminProducts:adminProductsSlice,
      shopProducts:shopProductsSlice,
      shopCart:shopCartSlice,
      shopAddress:shopAddressSlice,
      shopOrder:shopOrderSlice
    },
  });
  
  export default store;