import SummaryApi from "@/common/summaryApi.js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk("/products/addnewproduct",

  async (formData) => {

    const result = await axios({

        method: SummaryApi.addProducts.method,
        url: SummaryApi.addProducts.url,
      data: formData,
      headers: {
        "Content-Type": "application/json",
      },
    });

    //  console.log(result)
    return result?.data;
  }
);

export const fetchAllProducts = createAsyncThunk( "/products/fetchAllProducts",
   
    async () => {

      const result = await axios({
        method: SummaryApi.fetchAllProducts.method,
        url: SummaryApi.fetchAllProducts.url,
      });
  
      return result?.data;
    }
  );

  export const editProduct = createAsyncThunk("/products/editProduct",
   
    async ({ id, formData }) => {

      const result = await axios({
        method: SummaryApi.editProduct.method,
        url: `${SummaryApi.editProduct.url}/${id}`,
        data: formData,
        headers: {
          "Content-Type": "application/json",
        },
      });
    //    console.log(result)
      return result?.data;
    }
  );

  export const deleteProduct = createAsyncThunk("/products/deleteProduct",

    async(id)=>{

      const result = await axios({
        method: SummaryApi.deleteProduct.method,
        url: `${SummaryApi.deleteProduct.url}/${id}`,
      });
       
    //   console.log(result)
      return result?.data;
    }
  );

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductsSlice.reducer;
