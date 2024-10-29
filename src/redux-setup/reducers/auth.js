import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customer: null,
  accessToken: null,
};

const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { customer, accessToken } = action.payload;
      state.customer = customer;
      state.accessToken = accessToken;
    },
    editCustomer: (state, action) => {},
    clearLogin: (state) => {
      state.customer = null;
      state.accessToken = null;
    },
  },
});

export const { loginSuccess, clearLogin } = authReducer.actions;
export default authReducer.reducer;
