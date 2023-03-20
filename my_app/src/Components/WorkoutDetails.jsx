import { useDispatch, useSelector } from "react-redux";
import { deleteWorkout } from "../store/thunks/workoutThunk";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { formActions } from "../store/slices/formSlice";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const handleDelete = () => {
    if (!user) {
      console.log("You are no logged in");
    }
    dispatch(deleteWorkout(workout._id, user.token));
  };
  const handleEdit = () => {
    dispatch(formActions.setTitle(workout.title));
    dispatch(formActions.setLoad(workout.load));
    dispatch(formActions.setReps(workout.reps));
    dispatch(formActions.setIsEditing(true));
    dispatch(formActions.setEditingWorkoutId(workout._id));
  };
  return (
    <div className="bg-white h-max rounded p-5 relative shadow-sm">
      <h4 className="mb-2 text-lg text-cyan-600 font-semibold">
        {workout.title}
      </h4>
      <p className="text-sm text-gray-600">
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <div className="absolute top-5 right-5 flex space-x-2">
        <span
          className=" cursor-pointer bg-[#f1f1f1] hover:bg-gray-300 text-sm font-semibold p-1 text-gray-600 rounded-md"
          onClick={handleEdit}
        >
          <FiEdit className="text-lg text-green-500" />
        </span>
        <span
          className=" cursor-pointer bg-[#f1f1f1] hover:bg-gray-300 text-sm font-semibold p-1 text-gray-600 rounded-md"
          onClick={handleDelete}
        >
          <BsTrash className="text-lg text-red-500" />
        </span>
      </div>
    </div>
  );
};

export default WorkoutDetails;
