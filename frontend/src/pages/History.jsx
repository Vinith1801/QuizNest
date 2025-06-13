import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useAuth } from "../auth/AuthContext";

const History = () => {
  const { token } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("/quiz/history", {
          headers: { Authorization: token },
        });
        setHistory(res.data);
      } catch (err) {
        console.error("Failed to fetch quiz history", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-blue-600 font-semibold text-xl">
        ⏳ Loading your quiz history...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-20 px-4">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">🕓 My Quiz History</h1>

      {history.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">You haven’t completed any quizzes yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl">
          <table className="w-full min-w-[600px] text-sm sm:text-base">
            <thead>
              <tr className="text-blue-700 border-b-2 border-blue-300 text-left">
                <th className="py-3">#</th>
                <th className="py-3">Category</th>
                <th className="py-3">Score</th>
                <th className="py-3">Time Taken</th>
                <th className="py-3">Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {history.map((entry, index) => {
                const percentage = (entry.score / entry.total_questions) * 100;
                const scoreColor =
                  percentage >= 80
                    ? "bg-green-100 text-green-700"
                    : percentage >= 50
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700";

                return (
                  <tr key={index} className="hover:bg-blue-50 transition">
                    <td className="py-3 px-2 font-medium">{index + 1}</td>
                    <td className="py-3 px-2">{entry.category}</td>
                    <td className="py-3 px-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${scoreColor}`}>
                        {entry.score} / {entry.total_questions}
                      </span>
                    </td>
                    <td className="py-3 px-2">{entry.time_taken}s</td>
                    <td className="py-3 px-2">
                      {new Date(entry.created_at).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default History;
