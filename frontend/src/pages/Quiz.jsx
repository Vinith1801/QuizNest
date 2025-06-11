// src/pages/Quiz.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../auth/AuthContext";

const Quiz = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [startTime, setStartTime] = useState(null); // Total quiz timer
  const [timeLeft, setTimeLeft] = useState(30);     // Per-question timer

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`/quiz/questions?category=${id}`, {
          headers: { Authorization: token },
        });
        setQuestions(res.data);
        setStartTime(Date.now());
      } catch (err) {
        console.error("Failed to fetch questions", err);
      }
    };

    fetchQuestions();
  }, [id, token]);

  // ⏱ Countdown timer for each question
  useEffect(() => {
    setTimeLeft(30); // Reset on question change

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleNext(); // Auto next if time runs out
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    const currentQuestion = questions[currentIndex];
    if (selectedOption === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }

    setSelectedOption(null);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    try {
      await axios.post(
        "/quiz/submit-score",
        {
          categoryId: parseInt(id),
          score,
          timeTaken,
          totalQuestions: questions.length,
        },
        {
          headers: { Authorization: token },
        }
      );

      navigate("/result", {
        state: { score, total: questions.length, timeTaken, categoryId: id },
      });
    } catch (err) {
      console.error("Failed to submit score", err);
    }
  };

  if (!questions.length) return <div className="text-center mt-10">Loading...</div>;

  const currentQuestion = questions[currentIndex];

  return (
  <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-2xl">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-bold text-blue-700">
      Question {currentIndex + 1} / {questions.length}
    </h2>
    <div className="text-sm text-red-500 font-semibold">
      ⏳ {timeLeft}s left
    </div>
    <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
  <div
    className="h-2 bg-blue-600 rounded-full transition-all duration-300"
    style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
  ></div>
</div>

  </div>

  <p className="text-lg font-medium text-gray-800 mb-6">{currentQuestion.question}</p>

  <div className="grid gap-4">
    {currentQuestion.options.map((option, idx) => (
      <button
        key={idx}
        onClick={() => handleOptionClick(option)}
        className={`w-full py-3 px-4 rounded-lg border transition-all duration-150 ${
          selectedOption === option
            ? "bg-blue-600 text-white border-blue-700"
            : "bg-gray-50 hover:bg-gray-100 border-gray-300 text-gray-800"
        }`}
      >
        {option}
      </button>
    ))}
  </div>

  <button
    onClick={handleNext}
    className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
    disabled={selectedOption === null}
  >
    {currentIndex + 1 === questions.length ? "Submit Quiz" : "Next Question"}
  </button>
</div>

  );
};

export default Quiz;
