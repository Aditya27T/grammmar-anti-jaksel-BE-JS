const quizControler = require('../controllers/quiz.controller');
const router = require('express').Router();

router.post('/', quizControler.create);
router.get('/', quizControler.findAll);
router.get('/:id', quizControler.findOne);
router.put('/:id', quizControler.update);
router.delete('/:id', quizControler.destroy);

module.exports = router;