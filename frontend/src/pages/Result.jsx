// src/pages/Result.jsx
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total, timeTaken } = location.state || {};

  if (score === undefined) {
    return (
      <div className="text-center mt-10">
        <p className="text-lg">No result data found. Please take a quiz first.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => navigate("/")}
        >
          Go Home
        </button>
      </div>
    );
  }

  const percentage = Math.round((score / total) * 100);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4 text-center">🎉 Quiz Completed!</h1>
      <div className="text-center text-lg">
        <p className="mb-2">✅ Score: <strong>{score}</strong> out of <strong>{total}</strong></p>
        <p className="mb-2">📊 Percentage: <strong>{percentage}%</strong></p>
        <p className="mb-4">⏱️ Time Taken: <strong>{timeTaken}s</strong></p>
        <p className="text-green-600 font-semibold">
          {percentage >= 80
            ? "Excellent! 🏆"
            : percentage >= 50
            ? "Good effort! 👍"
            : "Keep practicing! 💪"}
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => navigate("/categories")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Try Another Quiz
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
