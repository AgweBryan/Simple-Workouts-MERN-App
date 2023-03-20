import { workoutsActions } from "../slices/workoutSlice";

const getAllWorkouts = async (token) => {
  const res = await fetch("/api/workouts", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (res.ok) {
    return data;
  }
  return [];
};
export const fetchAllWorkouts = (token) => async (dispatch) => {
  try {
    const fetchedData = await getAllWorkouts(token);
    dispatch(workoutsActions.updateWorkouts(fetchedData));
  } catch (e) {
    console.log(e);
  }
};

export const sendNewWorkout = (workout, token) => async (dispatch) => {
  const createWorkout = async () => {
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: workout,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    return data;
  };

  try {
    dispatch(workoutsActions.setIsLoading(true));
    await createWorkout();
    const workouts = await getAllWorkouts(token);
    dispatch(workoutsActions.updateWorkouts(workouts));
    dispatch(workoutsActions.setIsLoading(false));
  } catch (e) {
    console.log(e.error);
  }
};

export const deleteWorkout = (workoutId, token) => async (dispatch) => {
  const removeWorkout = async () => {
    const res = await fetch("/api/workouts/" + workoutId, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  };

  try {
    await removeWorkout();
    const workouts = await getAllWorkouts(token);
    dispatch(workoutsActions.updateWorkouts(workouts));
  } catch (e) {
    console.log(e.error);
  }
};

export const sendEditWorkout =
  (workout, workoutId, token) => async (dispatch) => {
    const editWorkout = async () => {
      const parsedWorkout = JSON.stringify(workout);
      console.log(parsedWorkout);
      const res = await fetch("/api/workouts/" + workoutId, {
        method: "PATCH",
        body: parsedWorkout,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data;
    };

    try {
      await editWorkout();
      const workouts = await getAllWorkouts(token);
      dispatch(workoutsActions.updateWorkouts(workouts));
    } catch (e) {
      console.log(e.error);
    }
  };
