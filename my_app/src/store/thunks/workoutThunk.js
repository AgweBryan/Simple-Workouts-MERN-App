import { workoutsActions } from "../slices/workoutSlice";

const getAllWorkouts = async () => {
  const res = await fetch("/api/workouts");
  const data = await res.json();
  return data;
};
export const fetchAllWorkouts = () => async (dispatch) => {
  try {
    const fetchedData = await getAllWorkouts();
    dispatch(workoutsActions.updateWorkouts(fetchedData));
  } catch (e) {
    console.log(e);
  }
};

export const sendNewWorkout = (workout) => async (dispatch) => {
  const createWorkout = async () => {
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: workout,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    return data;
  };

  try {
    dispatch(workoutsActions.setIsLoading(true));
    await createWorkout();
    const workouts = await getAllWorkouts();
    dispatch(workoutsActions.updateWorkouts(workouts));
    dispatch(workoutsActions.setIsLoading(false));
  } catch (e) {
    console.log(e.error);
  }
};

export const deleteWorkout = (workoutId) => async (dispatch) => {
  const removeWorkout = async () => {
    const res = await fetch("/api/workouts/" + workoutId, {
      method: "DELETE",
    });
    const data = await res.json();
    return data;
  };

  try {
    await removeWorkout();
    const workouts = await getAllWorkouts();
    dispatch(workoutsActions.updateWorkouts(workouts));
  } catch (e) {
    console.log(e.error);
  }
};

export const sendEditWorkout = (workout, workoutId) => async (dispatch) => {
  const editWorkout = async () => {
    const parsedWorkout = JSON.stringify(workout);
    console.log(parsedWorkout);
    const res = await fetch("/api/workouts/" + workoutId, {
      method: "PATCH",
      body: parsedWorkout,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  };

  try {
    await editWorkout();
    const workouts = await getAllWorkouts();
    dispatch(workoutsActions.updateWorkouts(workouts));
  } catch (e) {
    console.log(e.error);
  }
};
