import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import "../App.css";
import { authActions } from "../store/slices/authSlice";
import { workoutsActions } from "../store/slices/workoutSlice";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(authActions.logout());
    dispatch(workoutsActions.updateWorkouts([]));
  };
  return (
    <header className="bg-white">
      <div className="wrapper flex flex-col md:flex-row">
        <Link to="" className="text-gray-900 text-xl font-bold">
          <h1>Workout Buddy</h1>
        </Link>
        <nav className="flex items-center">
          {user && (
            <div className="sm:space-x-2 text-center sm:text-start">
              <span className="text-slate-600 font-semibold">{user.email}</span>
              <button
                className="border-2 border-green-500 hover:bg-green-700 hover:text-white cursor-pointer rounded text-green-500 py-1 px-2"
                onClick={handleClick}
              >
                Log out
              </button>
            </div>
          )}
          {!user && (
            <div>
              <NavLink
                className={({ isActive }) =>
                  `ml-3 font-semibold ${isActive && "text-green-500"} ${
                    !isActive && "text-gray-800"
                  }`
                }
                to="/login"
              >
                Login
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `ml-3 font-semibold ${isActive && "text-green-500"} ${
                    !isActive && "text-gray-800"
                  }`
                }
                to="/signup"
              >
                Signup
              </NavLink>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
