const youtubeController = require('../controllers/youtube.controller');
const router = require('express').Router();

router.get('/', youtubeController.getVideos);
router.get('/:id', youtubeController.getVideoById);
router.post('/', youtubeController.createVideo);
router.put('/:id', youtubeController.updateVideo);
router.delete('/:id', youtubeController.deleteVideo);


module.exports = router;