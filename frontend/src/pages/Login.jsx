// src/pages/Login.jsx
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    await login(formData);
    navigate("/profile");
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="username" placeholder="Username" className="w-full p-2 border rounded" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" className="w-full p-2 border rounded" onChange={handleChange} />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="mt-2 text-sm">
        Don’t have an account? <Link to="/signup" className="text-blue-500">Signup</Link>
      </p>
    </div>
  );
};

export default Login;
