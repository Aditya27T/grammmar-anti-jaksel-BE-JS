const express = require('express');
const router = express.Router();
const categoriesRoute = require('./category');
const quizRoute = require('./quiz');
const youtubeRoute = require('./youtube');
const materialRoute = require('./material');


//welcome API page using jade
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Grammar Anti Jaksel-API' });
});

router.use('/v1/material', materialRoute);
router.use('/v1/quiz', quizRoute);
router .use('/v1/youtube', youtubeRoute);
router.use('/v1/category', categoriesRoute);


module.exports = router;