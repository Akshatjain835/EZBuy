import SummaryApi from "@/common/summaryApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  addressList: [],
};
export const addNewAddress = createAsyncThunk("/addresses/addNewAddress",
    async (formData) => {
      const response = await axios({
        url: SummaryApi.addUserAddress.url,
        method: SummaryApi.addUserAddress.method,
        data: formData,
      });
  
      return response.data;
    }
  );


  export const fetchAllAddresses = createAsyncThunk("/addresses/fetchAllAddresses",

        async (userId) => {

          const response = await axios({
            url: `${SummaryApi.getUserAddresses.url}/${userId}`,
            method: SummaryApi.getUserAddresses.method,
          });
      
          return response.data;
        }
      );
      


 export const editaAddress = createAsyncThunk("addresses/updateAddress",

        async ({ userId, addressId, formData }) => {

          const response = await axios({
            url: `${SummaryApi.updateAddress.url}/${userId}/${addressId}`,
            method: SummaryApi.updateAddress.method,
            data: formData,
          });
      
          return response.data;
        }
      );


export const deleteAddress = createAsyncThunk( "/addresses/deleteAddress",

    async ({ userId, addressId }) => {

      const response = await axios({
        url: `${SummaryApi.deleteAddress.url}/${userId}/${addressId}`,
        method: SummaryApi.deleteAddress.method,
      });

  
      return response.data;
    }
  );

  
const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddresses.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default addressSlice.reducer;