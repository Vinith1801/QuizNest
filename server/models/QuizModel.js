const { db } = require("../config/db");

const getAllCategories = (callback) => {
  db.query("SELECT * FROM categories", callback);
};

const getQuestionsByCategory = (categoryId, callback) => {
  db.query(
    "SELECT id, question, options, answer FROM questions WHERE category_id = ?",
    [categoryId],
    callback
  );
};

const insertScore = (userId, categoryId, score, callback) => {
  db.query(
    "INSERT INTO scores (user_id, category_id, score) VALUES (?, ?, ?)",
    [userId, categoryId, score],
    callback
  );
};

const getTopScores = (categoryId, callback) => {
  const query = `
    SELECT u.username, MAX(s.score) as top_score
    FROM scores s
    JOIN users u ON s.user_id = u.id
    WHERE s.category_id = ?
    GROUP BY s.user_id
    ORDER BY top_score DESC
    LIMIT 10
  `;
  db.query(query, [categoryId], callback);
};

module.exports = {
  getAllCategories,
  getQuestionsByCategory,
  insertScore,
  getTopScores,
};
