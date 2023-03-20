import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import formSlice from "./slices/formSlice";
import workoutsSlice from "./slices/workoutSlice";

const store = configureStore({
  reducer: {
    workouts: workoutsSlice.reducer,
    form: formSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
