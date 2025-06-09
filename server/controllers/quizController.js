const QuizModel = require("../models/QuizModel");

const getCategories = (req, res) => {
  QuizModel.getAllCategories((err, results) => {
    if (err) return res.status(500).json({ msg: "Error fetching categories" });
    res.json(results);
  });
};

const getQuestions = (req, res) => {
  const categoryId = req.params.id;

  QuizModel.getQuestionsByCategory(categoryId, (err, results) => {
    if (err) return res.status(500).json({ msg: "Error fetching questions" });

    // Optionally parse options from JSON string to array
    const formatted = results.map((q) => ({
      ...q,
      options: JSON.parse(q.options),
    }));

    res.json(formatted);
  });
};

const submitScore = (req, res) => {
  const userId = req.user.id;
  const { categoryId, score } = req.body;

  QuizModel.insertScore(userId, categoryId, score, (err, result) => {
    if (err) return res.status(500).json({ msg: "Error saving score" });
    res.json({ msg: "Score submitted successfully" });
  });
};

const getLeaderboard = (req, res) => {
  const categoryId = req.params.id;

  QuizModel.getTopScores(categoryId, (err, results) => {
    if (err) return res.status(500).json({ msg: "Error fetching leaderboard" });
    res.json(results);
  });
};

module.exports = {
  getCategories,
  getQuestions,
  submitScore,
  getLeaderboard,
};
