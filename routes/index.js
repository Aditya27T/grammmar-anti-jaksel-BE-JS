const express = require('express');
const router = express.Router();
const quiz = require('./quiz')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Quiz page. */
router.use('/quiz', quiz);

module.exports = router;
