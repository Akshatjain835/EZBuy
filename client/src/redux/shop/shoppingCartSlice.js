import SummaryApi from "@/common/summaryApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    cartItems: [],
    isLoading: false,
  };

export const addToCart = createAsyncThunk( "cart/addToCart",

    async ({ userId, productId, quantity }) => {

        const response = await axios({
          url: SummaryApi.addToCart.url,
          method: SummaryApi.addToCart.method,
          data: {
            userId,
            productId,
            quantity
          }
        });
        // console.log(response)
      
        return response.data;
      }
 )

export const fetchCartItems = createAsyncThunk("cart/fetchCartItems",

    async (userId) => {

      const response = await axios({
        url: `${SummaryApi.fetchCartItems.url}/${userId}`,
        method: SummaryApi.fetchCartItems.method,
      });
    //   console.log(response)
  
      return response.data;
    }
);

export const deleteCartItem = createAsyncThunk("cart/deleteCartItem",

    async ({ userId, productId }) => {

      const response = await axios({
        url: `${SummaryApi.deleteCartItem.url}/${userId}/${productId}`,
        method: SummaryApi.deleteCartItem.method,
      });
  
      return response.data;
    }

  );

export const updateCartQuantity = createAsyncThunk("cart/updateCartQuantity",

    async ({ userId, productId, quantity }) => {

      const response = await axios({
        url: SummaryApi.updateCartQuantity.url,
        method: SummaryApi.updateCartQuantity.method,
        data: { 
            userId,
             productId, 
             quantity 
        },
      });
  
      return response.data;
    }
  );

const shoppingCartSlice=createSlice({
       name:"shoppingCart",
       initialState,
       reducers:{

       },
       extraReducers:(builder)=>{

        builder
        .addCase(addToCart.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(addToCart.fulfilled, (state, action) => {
          state.isLoading = false;
          state.cartItems = action.payload.data;
        })
        .addCase(addToCart.rejected, (state) => {
          state.isLoading = false;
          state.cartItems = [];
        })

        .addCase(fetchCartItems.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchCartItems.fulfilled, (state, action) => {
          state.isLoading = false;
          state.cartItems = action.payload.data;
        })
        .addCase(fetchCartItems.rejected, (state) => {
          state.isLoading = false;
          state.cartItems = [];
        })

        .addCase(updateCartQuantity.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateCartQuantity.fulfilled, (state, action) => {
          state.isLoading = false;
          state.cartItems = action.payload.data;
        })
        .addCase(updateCartQuantity.rejected, (state) => {
          state.isLoading = false;
          state.cartItems = [];
        })
        .addCase(deleteCartItem.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(deleteCartItem.fulfilled, (state, action) => {
          state.isLoading = false;
          state.cartItems = action.payload.data;
        })
        .addCase(deleteCartItem.rejected, (state) => {
          state.isLoading = false;
          state.cartItems = [];
        });
       }
})


export default shoppingCartSlice.reducer;