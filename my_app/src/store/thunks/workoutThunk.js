import { formActions } from "../slices/formSlice";
import { workoutsActions } from "../slices/workoutSlice";

const getAllWorkouts = async (token, dispatch) => {
  const res = await fetch("/api/workouts", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const workouts = await res.json();

  dispatch(workoutsActions.updateWorkouts(workouts));
};

// Get all workouts
export const fetchAllWorkouts = (token) => async (dispatch) => {
  const fetchedWorkouts = await getAllWorkouts(token, dispatch);
  dispatch(workoutsActions.updateWorkouts(fetchedWorkouts));
};

// Create a workout
export const sendNewWorkout = (workout, token) => async (dispatch) => {
  dispatch(workoutsActions.setIsLoading(true));
  const res = await fetch("/api/workouts", {
    method: "POST",
    body: workout,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  if (res.ok) {
    await getAllWorkouts(token, dispatch);

    dispatch(workoutsActions.setIsLoading(false));
    return;
  }

  dispatch(formActions.setError(data.error));
  dispatch(workoutsActions.setIsLoading(false));

  setTimeout(() => {
    dispatch(formActions.setError(""));
  }, 3000);
  clearTimeout();
};

// Delete a workout
export const deleteWorkout = (workoutId, token) => async (dispatch) => {
  await fetch("/api/workouts/" + workoutId, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  await getAllWorkouts(token, dispatch);
};

// Edit a workout
export const sendEditWorkout =
  (workout, workoutId, token) => async (dispatch) => {
    const res = await fetch("/api/workouts/" + workoutId, {
      method: "PATCH",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (res.ok) {
      await getAllWorkouts(token, dispatch);

      dispatch(workoutsActions.setIsLoading(false));
      return;
    }

    dispatch(formActions.setError(data.error));
    dispatch(workoutsActions.setIsLoading(false));

    setTimeout(() => {
      dispatch(formActions.setError(""));
    }, 3000);
    clearTimeout();
  };
