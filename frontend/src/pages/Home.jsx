// src/pages/Home.jsx
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Quiz App 🧠</h1>
      <Link
        to="/categories"
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Start Quiz
      </Link>
    </div>
  );
};

export default Home;
