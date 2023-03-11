import { configureStore } from "@reduxjs/toolkit";
import formSlice from "./slices/formSlice";
import workoutsSlice from "./slices/workoutSlice";

const store = configureStore({
  reducer: {
    workouts: workoutsSlice.reducer,
    form: formSlice.reducer,
  },
});

export default store;
