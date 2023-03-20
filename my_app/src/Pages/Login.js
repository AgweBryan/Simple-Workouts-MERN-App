import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/thunks/authThunk";

const Login = () => {
  const authState = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <form
      className="max-w-sm my-10 mx-auto p-5 bg-white rounded shadow"
      onSubmit={handleSubmit}
    >
      <h3 className="text-gray-800 font-bold text-lg mb-3">Log in</h3>
      <label className="block font-semibolg">Email:</label>
      <input
        className="border border-gray-200 mb-3 p-1 rounded w-full"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label className="block font-semibolg">Password:</label>
      <input
        className="border border-gray-200 mb-3 p-1 rounded w-full"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700  rounded text-white py-1 px-2 "
      >
        {authState.isLoading ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
};

export default Login;
