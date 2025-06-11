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
  const [startTime, setStartTime] = useState(null);

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

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    const currentQuestion = questions[currentIndex];
    if (selectedOption === currentQuestion.answer)
 {
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
      navigate("/result", { state: { score, total: questions.length, timeTaken } });
    } catch (err) {
      console.error("Failed to submit score", err);
    }
  };

  if (!questions.length) return <div className="text-center mt-10">Loading...</div>;

  const currentQuestion = questions[currentIndex];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">
        Question {currentIndex + 1} of {questions.length}
      </h2>
      <p className="text-lg mb-4">{currentQuestion.question}</p>

      <div className="grid gap-3">
        {currentQuestion.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleOptionClick(option)}
            className={`w-full py-2 px-4 rounded border ${
              selectedOption === option ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        disabled={selectedOption === null}
      >
        {currentIndex + 1 === questions.length ? "Submit" : "Next"}
      </button>
    </div>
  );
};

export default Quiz;
