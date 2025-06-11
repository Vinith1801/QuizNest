// src/pages/Category.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/quiz/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="p-4 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Choose a Category</h1>
      <div className="grid grid-cols-2 gap-4">
        {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => navigate(`/quiz/${cat.id}`)}
          className="bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600 transition"
        >
          📚 {cat.name}
        </button>
      ))}
      </div>
    </div>
  );
};

export default Category;
