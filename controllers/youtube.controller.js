const model = require('../repositories');
const yt = model.youtube;

const getVideos = async (req, res) => {
    try {
        const data = await yt.findAll();
        return res.status(200).json({
            message: 'Videos retrieved successfully',
            data: data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
}

const getVideoById = async (req, res) => {
    try {
        const { id } = req.params;
        const video = await yt.findOne({
            where: { id: id }
        });
        if (video) {
            return res.status(200).json({
                message: 'Video retrieved successfully',
                data: video
            });
        }
        return res.status(404).json({
            message: 'Video with the specified ID does not exists',
            data: null
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
}

const createVideo = async (req, res) => {
    const { url, categoryId } = req.body;
    if (!categoryId || !url) {
        return res.status(400).json({
            message: 'Title and URL are required',
            data: null
        });
    }
    try {
        const video = await yt.create({ categoryId, url });
        return res.status(201).json({
            message: 'Video created successfully',
            data: video
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
}

const updateVideo = async (req, res) => {
    const { id } = req.params;
    const { categoryId, url } = req.body;
    if (!categoryId || !url) {
        return res.status(400).json({
            message: 'Title and URL are required',
            data: null
        });
    }
    try {
        await yt.update({ categoryId, url }, { where: { id: id } });
        if (!yt) {
            return res.status(404).json({
                message: 'Video with the specified ID does not exists',
                data: null
            });
        }
        const updatedVideo = await yt.findOne({ where: { id: id } });
        return res.status(200).json({
            message: 'Video updated successfully',
            data: updatedVideo
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
}

const deleteVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await yt.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.status(204).json({
                message: 'Video deleted successfully',
                data: null
            });
        }
        throw new Error("Video not found");
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
}

module.exports = {
    getVideos,
    getVideoById,
    createVideo,
    updateVideo,
    deleteVideo
}