import { createSlice } from "@reduxjs/toolkit";

const workoutsSlice = createSlice({
  name: "workoutsSlice",
  initialState: { workouts: [], isLoading: false },
  reducers: {
    updateWorkouts(state, action) {
      state.workouts = action.payload;
    },

    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const workoutsActions = workoutsSlice.actions;
export default workoutsSlice;
