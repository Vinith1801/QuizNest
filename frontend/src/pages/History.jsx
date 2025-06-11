// src/pages/History.jsx
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

  if (loading) return <div className="text-center mt-10">Loading history...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6 text-center">🕓 My Quiz History</h1>

      {history.length === 0 ? (
        <p className="text-center text-gray-600">You haven’t completed any quizzes yet.</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border-b p-2">#</th>
              <th className="border-b p-2">Category</th>
              <th className="border-b p-2">Score</th>
              <th className="border-b p-2">Time Taken (s)</th>
              <th className="border-b p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry, index) => (
              <tr key={index}>
                <td className="p-2 text-center">{index + 1}</td>
                <td className="p-2">{entry.category}</td>
                <td className="p-2">{entry.score} / {entry.total_questions}</td>
                <td className="p-2">{entry.time_taken}</td>
                <td className="p-2">{new Date(entry.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default History;
