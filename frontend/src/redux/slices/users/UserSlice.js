import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
export const registerUserAction = createAsyncThunk(
    "users/register",
    async (user, { rejectWithValue, getState, dispatch }) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      //http call
      try {


        const { data } = await axios.post(
          `http://localhost:7777/api/users/register`,
          user,
          config
        );
        return data;
      } catch (error) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }

    
  );


  export const loginUserAction = createAsyncThunk(
    "user/login",
    async (userData, { rejectWithValue, getState, dispatch }) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        //make http call
        const { data } = await axios.post(
          `http://localhost:7777/api/users/login`,
          userData,
          config
        );
        //save user into local storage
        // localStorage.setItem("userInfo", JSON.stringify(data));
        console.log(data)
        return data;
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
  );
const userSlices = createSlice({
    name:"users",
    initialState:{
       
    },
    
        extraReducers: builder => {
            //register
            builder.addCase(registerUserAction.pending, (state, action) => {
              state.loading = true;
              state.appErr = undefined;
              state.serverErr = undefined;
            });
            builder.addCase(registerUserAction.fulfilled, (state, action) => {
              state.loading = false;
              state.registered = action?.payload;
              state.appErr = undefined;
              state.serverErr = undefined;
            });
            builder.addCase(registerUserAction.rejected, (state, action) => {
              console.log(action.payload);
              state.loading = false;
              state.appErr = action?.payload?.message;
              state.serverErr = action?.error?.message;
            });

            //login

            builder.addCase(loginUserAction.pending, (state, action) => {
              state.loading = true;
              state.appErr = undefined;
              state.serverErr = undefined;
            });
            builder.addCase(loginUserAction.fulfilled, (state, action) => {
              state.registered = action?.payload;
              state.loading = false;
              state.appErr = undefined;
              state.serverErr = undefined;
            });
            builder.addCase(loginUserAction.rejected, (state, action) => {
              state.appErr = action?.payload?.message;
              state.serverErr = action?.error?.message;
              state.loading = false;
            });
        
    }
})



export default userSlices.reducer;