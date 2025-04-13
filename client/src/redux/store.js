import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authslice/authSlice.js";
import adminProductsSlice from './admin/adminProductSlice.js'
import shopProductsSlice from './shop/shoppingProductSlice.js'
import shopCartSlice from './shop/shoppingCartSlice.js'
import shopAddressSlice from "./shop/shoppingAddressSlice.js";
import shopOrderSlice from "./shop/shoppingOrderSlice.js";
import adminOrderSlice from "./admin/adminOrderSlice.js";
import shopSearchSlice from "./shop/shoppingSearchSlice.js";
import shopReviewSlice from "./shop/shoppingReviewSlice.js";
import commonFeatureSlice from "./common/commonSlice.js";

const store = configureStore({
    reducer: {
      auth: authReducer,
      adminProducts:adminProductsSlice,
      adminOrder:adminOrderSlice,
      shopProducts:shopProductsSlice,
      shopCart:shopCartSlice,
      shopAddress:shopAddressSlice,
      shopOrder:shopOrderSlice,
      shopSearch:shopSearchSlice,
      shopReview:shopReviewSlice,
      commonFeature:commonFeatureSlice,
    },
  });
  
  export default store;