const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const connectDB = () => {
  db.connect((err) => {
    if (err) throw err;
    console.log("MySQL Connected");
  });
};

module.exports = connectDB;
module.exports.db = db; // Export db for use in models
