# 🧠 QuizNest – Backend

> RESTful API for a modern quiz web app built with **Node.js**, **Express**, **MySQL**, and **JWT authentication**.

---

## 📁 Project Structure

```
├── config/
│   └── db.js               # MySQL connection setup
│
├── controllers/
│   ├── authController.js   # Signup/Login logic
│   └── quizController.js   # Quiz & Score logic
│
├── middleware/
│   └── authMiddleware.js   # JWT auth verification
│
├── models/
│   ├── UserModel.js        # User DB logic
│   └── QuizModel.js        # Quiz DB logic
│
├── routes/
│   ├── authRoutes.js       # /api/auth
│   └── quizRoutes.js       # /api/quiz
│
├── utils/
│   └── generateToken.js    # JWT generator
│
├── .env
├── .gitignore
├── package.json
└── server.js               # App entry point
```

---

## ⚙️ Tech Stack

* **Backend**: Node.js + Express
* **Database**: MySQL
* **Auth**: JWT (token-based)
* **Password Security**: bcryptjs
* **API Structure**: RESTful

---

## 🔐 Authentication

Implemented using JSON Web Tokens.

* `POST /api/auth/signup`: Register with unique username & password.
* `POST /api/auth/login`: Receive JWT on success.
* Protected routes require header:
  `Authorization: <token>`

---

## 📋 API Endpoints

### 🔐 Auth

| Method | Endpoint           | Protected | Description           |
| ------ | ------------------ | --------- | --------------------- |
| POST   | `/api/auth/signup` | ❌         | Register new user     |
| POST   | `/api/auth/login`  | ❌         | Login & get JWT token |

---

### 📚 Quiz

| Method | Endpoint                    | Protected | Description                  |
| ------ | --------------------------- | --------- | ---------------------------- |
| GET    | `/api/quiz/categories`      | ❌         | List all quiz categories     |
| GET    | `/api/quiz/questions/:id`   | ✅         | Get questions by category ID |
| POST   | `/api/quiz/submit-score`    | ✅         | Submit quiz score            |
| GET    | `/api/quiz/leaderboard/:id` | ❌         | Top 10 scores in a category  |

---

## 🧪 Sample `.env`

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=quiz_app
JWT_SECRET=your_jwt_secret
```

---

## 🧠 Features Summary

* ✅ User Registration & Login with JWT
* ✅ Quiz Categories & Questions (protected)
* ✅ Score submission (linked to user + category)
* ✅ Leaderboard per category
* ✅ Clean MVC folder structure
* ✅ Modular route + controller + model separation

---

## 🧱 Database Tables
provided in the repo - dir name - database

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Set up .env
# 3. Run the server
npm start
```

---

## 📦 Future Enhancements

* [ ] Add user profile routes (total score, games played)
* [ ] Admin route to manage questions/categories
* [ ] Email-based password reset (with nodemailer)
* [ ] Tests with Jest or Supertest

---

Let me know if you want the frontend README to match this or need a badge/image-ready version!
