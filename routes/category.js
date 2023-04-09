const router = require('express').Router();
const categoryHandler = require('../controllers/category.controller');

router.get('/', categoryHandler.getCategories);
router.get('/:id', categoryHandler.getCategoryById);
router.post('/', categoryHandler.createCategory);
router.put('/:id', categoryHandler.updateCategory);
router.delete('/:id', categoryHandler.deleteCategory);

module.exports = router;