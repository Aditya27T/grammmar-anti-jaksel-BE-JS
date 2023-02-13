const express = require('express');
const router = express.Router();
const quiz= require('../controllers/quiz.controller');

// GET /quizzes
router.get('/', quiz.getQuiz);

// GET /quizzes?category=1
router.get('/', quiz.getQuizByCategory);

// GET /quizzes?level=1
router.get('/', quiz.getQuizByLevel);

// GET /quizzes/:id
router.get('/:id', quiz.getQuizById);

// POST /quizzes
router.post('/', quiz.postQuiz);

// PUT /quizzes/:id
router.put('/:id', quiz.putQuiz);

// DELETE /quizzes/:id
router.delete('/:id', quiz.deleteQuiz);

module.exports = router;