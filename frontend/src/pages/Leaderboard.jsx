import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../auth/AuthContext";

const Leaderboard = () => {
  const { id } = useParams(); // categoryId
  const navigate = useNavigate();
  const { user } = useAuth();
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMedal = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return rank;
  };

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(`/quiz/leaderboard/${id}`);
        setLeaders(res.data);
      } catch (err) {
        console.error("Failed to fetch leaderboard", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading leaderboard...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold text-center mb-6">🏆 Leaderboard</h1>

      {leaders.length === 0 ? (
        <p className="text-center text-gray-600">No scores yet for this category.</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b p-2">Rank</th>
              <th className="border-b p-2">Username</th>
              <th className="border-b p-2">Top Score</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((userEntry, index) => (
              <tr
                key={index}
                className={userEntry.username === user?.username ? "bg-yellow-100 font-semibold" : ""}
              >
                <td className="p-2">{getMedal(index + 1)}</td>
                <td className="p-2">{userEntry.username}</td>
                <td className="p-2">{userEntry.top_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={() => navigate("/categories")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Back to Categories
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
