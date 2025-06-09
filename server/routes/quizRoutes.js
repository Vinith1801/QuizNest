const express = require("express");
const { getCategories, getQuestions, submitScore, getLeaderboard } = require("../controllers/quizController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/categories", getCategories);
router.get("/questions", verifyToken, getQuestions);
router.post("/submit-score", verifyToken, submitScore);
router.get("/leaderboard", getLeaderboard);

module.exports = router;
