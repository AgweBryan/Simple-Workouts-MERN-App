import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import "../App.css";
import { authActions } from "../store/slices/authSlice";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <header className="bg-white">
      <div className="wrapper">
        <Link to="" className="text-gray-900 text-xl font-bold">
          <h1>Workout Buddy</h1>
        </Link>
        <nav className="flex items-center">
          {user && (
            <div>
              <span>{user.email}</span>
              <button
                className="bg-green-500 hover:bg-green-700 cursor-pointer rounded text-white py-1 px-2 "
                onClick={() => dispatch(authActions.logout())}
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
