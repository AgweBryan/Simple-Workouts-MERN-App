import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: null,
    isLoading: false,
    error: "",
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
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
