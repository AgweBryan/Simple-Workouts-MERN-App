import { Link } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  return (
    <header className="bg-white">
      <div className="wrapper">
        <Link to="" className="text-gray-800 font-semibold">
          <h1>Workout Buddy</h1>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
