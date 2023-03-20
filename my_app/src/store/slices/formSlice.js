import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "formSlice",
  initialState: {
    title: "",
    load: "",
    reps: "",
    isEditing: false,
    workoutId: "",
    error: "",
  },
  reducers: {
    editWorkout(state, action) {
      const { title, load, reps } = action.payload;
      state.title = title;
      state.load = load;
      state.reps = reps;
    },
    setEditingWorkoutId(state, action) {
      const editingWorkout = action.payload;
      state.workoutId = editingWorkout;
    },
    setIsEditing(state, action) {
      state.isEditing = action.payload;
    },
    setTitle(state, action) {
      state.title = action.payload;
    },
    setLoad(state, action) {
      state.load = action.payload;
    },
    setReps(state, action) {
      state.reps = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const formActions = formSlice.actions;
export default formSlice;
