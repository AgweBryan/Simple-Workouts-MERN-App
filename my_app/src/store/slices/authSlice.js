import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: null,
    isLoading: false,
  },
  reducers: {
    setUser(state, action) {
      const user = action.payload;
      state.user = user;
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
