import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/signin");
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl text-center space-y-4">
      <h1 className="text-3xl font-bold text-blue-600">👋 Hey, {user.username}!</h1>
      
      <div className="text-left mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
        <p className="text-gray-600 mb-2"><strong>User ID:</strong> {user.id}</p>
        <p className="text-gray-600 mb-2"><strong>User Name:</strong> {user.username}</p>
        {/* <p className="text-gray-600"><strong>Account Created:</strong> [placeholder]</p> */}
        {/* Optional: Add quiz stats if you track them */}
      </div>

      <button
        onClick={() => {
          logout();
          navigate("/signin");
        }}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full mt-4"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
