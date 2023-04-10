const quizControler = require('../controllers/quiz.controller');
const router = require('express').Router();

router.post('/', quizControler.create);
router.get('/', quizControler.findAll);
router.get('/:id', quizControler.findOne);
router.get('/category/:categoryId', quizControler.findByCategoryId);
router.put('/:id', quizControler.update);
router.delete('/:id', quizControler.destroy);
router.post('/submitOne', quizControler.submitOne);
router.post('/submitMany', quizControler.submitMany);

module.exports = router;