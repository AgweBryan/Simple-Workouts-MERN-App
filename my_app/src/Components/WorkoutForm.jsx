import { useDispatch, useSelector } from "react-redux";
import { formActions } from "../store/slices/formSlice";
import { sendEditWorkout, sendNewWorkout } from "../store/thunks/workoutThunk";

const WorkoutForm = () => {
  const { title, load, reps, isEditing, workoutId } = useSelector(
    (state) => state.form
  );
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      console.log("YOu are not logged in");
      return;
    }

    const workout = { title, load, reps };
    if (isEditing) {
      dispatch(sendEditWorkout(workout, workoutId, user.token));
    } else {
      dispatch(sendNewWorkout(JSON.stringify(workout), user.token));
    }

    dispatch(formActions.setTitle(""));
    dispatch(formActions.setLoad(""));
    dispatch(formActions.setReps(""));
    dispatch(formActions.setIsEditing(false));
    dispatch(formActions.setEditingWorkoutId(""));
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-gray-700 font-semibold text-lg mb-3">
        Add a New Workout
      </h2>
      <label className="text-sm font-semibold">Excersize Title:</label>
      <input
        className="mt-1 mb-3 w-full border rounded"
        type="text"
        onChange={(e) => dispatch(formActions.setTitle(e.target.value))}
        value={title}
      />
      <label className="text-sm font-semibold">Load (in kg):</label>
      <input
        className="mt-1 mb-3 w-full border rounded"
        type="number"
        onChange={(e) => dispatch(formActions.setLoad(e.target.value))}
        value={load}
      />
      <label className="text-sm font-semibold">Reps:</label>
      <input
        className="mt-1 mb-5 w-full border rounded"
        type="number"
        onChange={(e) => dispatch(formActions.setReps(e.target.value))}
        value={reps}
      />
      {isEditing && (
        <button className="bg-cyan-600 text-white p-1 text-sm px-2 rounded cursor-pointer hover:bg-cyan-900">
          Edit Workout
        </button>
      )}
      {!isEditing && (
        <button className="bg-cyan-600 text-white p-1 text-sm px-2 rounded cursor-pointer hover:bg-cyan-900">
          Add Workout
        </button>
      )}
    </form>
  );
};

export default WorkoutForm;
