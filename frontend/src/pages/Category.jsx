import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Loader from "../components/Loader";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await api.get("/quiz/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="max-w-5xl mx-auto px-4 mt-20">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">
        📚 Choose a Quiz Category
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => navigate(`/quiz/${cat.id}`)}
            className="bg-white/70 backdrop-blur-md shadow-md rounded-2xl p-6 hover:bg-blue-100 transition-all border border-blue-100 text-blue-800 font-semibold text-lg hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <div className="text-3xl mb-2">🧩</div>
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;
