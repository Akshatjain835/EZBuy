import SummaryApi from "@/common/summaryApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
};

export const addReview = createAsyncThunk( "/order/addReview",
    
    async (formdata) => {
      const response = await axios({
        method: SummaryApi.addReview.method,
        url: SummaryApi.addReview.url,
        data: formdata
      });
      return response.data;
    }
  );
  
  export const getReviews = createAsyncThunk("/order/getReviews",

    async (id) => {

      const response = await axios({
        method: SummaryApi.getReviews.method,
        url: `${SummaryApi.getReviews.url}/${id}`
      });
      return response.data;
    }
  );
  
const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default reviewSlice.reducer;