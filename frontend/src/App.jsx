import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Category from "./pages/Category";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Home from "./pages/Home";

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/profile"
        element={user ? <Profile /> : <Navigate to="/signin" />}
      />
      <Route path="/categories" element={<Category />} />
      <Route path="/quiz/:id" element={<Quiz />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
}

export default App;
