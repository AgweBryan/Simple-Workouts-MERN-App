import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../Components/Error";
import { signupUser } from "../store/thunks/authThunk";

const Signup = () => {
  const authState = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser({ email, username, password }));
  };

  return (
    <form
      className="max-w-sm my-10 mx-auto p-5 bg-white rounded shadow"
      onSubmit={handleSubmit}
    >
      <h3 className="text-gray-800 font-bold text-lg mb-3">Sign up</h3>
      <label className="block font-semibolg">Email:</label>
      <input
        className="border border-gray-200 mb-3 p-1 rounded w-full"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label className="block font-semibolg">Name:</label>
      <input
        className="border border-gray-200 mb-3 p-1 rounded w-full"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <label className="block font-semibolg">Password:</label>
      <input
        className="border border-gray-200 mb-3 p-1 rounded w-full"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button
        disabled={authState.isLoading}
        type="submit"
        className="bg-green-500 hover:bg-green-700  rounded text-white py-1 px-2 "
      >
        {authState.isLoading ? "Loading..." : "Sign up"}
      </button>
      {authState.error && <Error error={authState.error} />}
    </form>
  );
};

export default Signup;
