import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";


const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
  };

  export const registerUser = createAsyncThunk(
    "/auth/register",
  
    async (formData) => {
      const response = await axios.post(
        "http://localhost:5000/api/user/register",
        formData,
        {
          withCredentials: true,
        }
      );
  
      return response.data;
    }
  );

  export const loginUser = createAsyncThunk(
    "/auth/login",
  
    async (formData) => {
      // console.log(formData)

      const response = await axios.post(
        "http://localhost:5000/api/user/login",

        formData,
        {
          withCredentials: true,
        }
      );
  
      return response.data;
    }
  );


const authSlice = createSlice({

    name: "auth",
    initialState,
    reducers: {
      setUser: (state, action) => {
        
      },

    },
    extraReducers: (builder) => {
      builder
        .addCase(registerUser.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = null;
          state.isAuthenticated = false;
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.isLoading = false;
          state.user = null;
          state.isAuthenticated = false;
        })

        .addCase(loginUser.pending, (state) => {
          state.isLoading = true;
        })

        .addCase(loginUser.fulfilled, (state, action) => {
          // console.log(action);
  
          state.isLoading = false;
          state.user = action.payload.success ? action.payload.user : null;
          state.isAuthenticated = action.payload.success;
        })

        .addCase(loginUser.rejected, (state, action) => {
          state.isLoading = false;
          state.user = null;
          state.isAuthenticated = false;
        })


    }
 

})


export const {setUser}=authSlice.actions;

export  default authSlice.reducer
  