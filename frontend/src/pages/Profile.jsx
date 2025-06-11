import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin"); // Redirect if not logged in
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-xl text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.username}!</h1>

      <div className="mb-6 text-gray-700">
        <p><strong>User ID:</strong> {user.id}</p>
        {/* Add more user details if needed */}
      </div>

      <button
        onClick={() => {
          logout();
          navigate("/signin");
        }}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
