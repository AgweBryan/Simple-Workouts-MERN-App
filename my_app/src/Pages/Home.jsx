import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import WorkoutDetails from "../Components/WorkoutDetails";
import WorkoutForm from "../Components/WorkoutForm";
import { fetchAllWorkouts } from "../store/thunks/workoutThunk";

const Home = () => {
  const workouts = useSelector((state) => state.workouts.workouts);
  const isLoading = useSelector((state) => state.workouts.isLoading);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      dispatch(fetchAllWorkouts(user.token));
    }
  }, [dispatch, user]);

  return (
    <div className="container mx-auto">
      <div className="md:grid md:grid-cols-3/1 md:gap-6">
        <div className="flex flex-col md:flex-row gap-2">
          {isLoading && (
            <div className="bg-white rounded p-5 relative shadow-sm flex items-center justify-center">
              <h1>Loading...</h1>
            </div>
          )}
          {workouts &&
            workouts.map((workout) => (
              <WorkoutDetails key={workout._id} workout={workout} />
            ))}
        </div>
        <WorkoutForm />
      </div>
    </div>
  );
};

export default Home;
