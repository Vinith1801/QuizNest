import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const linkStyle =
    "text-gray-700 hover:text-blue-600";
  const activeStyle =
    "text-blue-600 font-semibold border-b-2 border-blue-600";

  return (
    <nav className="bg-white shadow p-4 mb-4">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">🧠 QuizApp</Link>
        <div className="space-x-4">
          <NavLink to="/categories" className={({ isActive }) => isActive ? activeStyle : linkStyle}>Categories</NavLink>
          <NavLink to="/history" className={({ isActive }) => isActive ? activeStyle : linkStyle}>History</NavLink>
          <NavLink to="/profile" className={({ isActive }) => isActive ? activeStyle : linkStyle}>Profile</NavLink>
          {user ? (
            <button onClick={logout} className="text-red-500 hover:underline">Logout</button>
          ) : (
            <NavLink to="/signin" className={({ isActive }) => isActive ? activeStyle : linkStyle}>Login</NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
