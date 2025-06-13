// ✅ Updated App.jsx with proper route protection using <ProtectedRoute>
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Category from "./pages/Category";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import History from "./pages/History";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  const { user } = useAuth();
  const location = useLocation();

  const isAuthPage = ["/signin", "/signup"].includes(location.pathname);

  return (
    <>
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />

        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        <Route path="/categories" element={
          <ProtectedRoute>
            <Category />
          </ProtectedRoute>
        } />

        <Route path="/quiz/:id" element={
          <ProtectedRoute>
            <Quiz />
          </ProtectedRoute>
        } />

        <Route path="/result" element={<Result />} />

        <Route path="/leaderboard/:id" element={
          <ProtectedRoute>
            <Leaderboard />
          </ProtectedRoute>
        } />

        <Route path="/history" element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        } />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;