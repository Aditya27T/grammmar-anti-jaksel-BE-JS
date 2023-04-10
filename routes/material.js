const material = require('../controllers/material.controller');
const sub = require('../controllers/subMaterial.controller');
const router = require('express').Router();

router.post('/', material.create);
router.get('/', material.findAll);
router.get('/:id', material.findOne);
router.put('/:id', material.update);
router.delete('/:id', material.destroy);
router.get('/category/:categoryId', material.findAllByCategory);

router.post('/sub', sub.create);
router.put('/sub/:id', sub.update);
router.get('/sub', sub.findAll);
router.get('/sub/:id', sub.findOne);


module.exports = router;