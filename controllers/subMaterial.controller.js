const model = require('../repositories');
const sub = model.subMaterial;

// Create and Save a new Material
const create = async (req, res) => {
    const {judul, materi1, categoryId } = req.body;

    if (!judul || !materi1 || !categoryId) {
        return res.status(400).json({
            message: "Content can not be empty!"
        });
    }
    const data = new sub({
        judul, materi1, categoryId
    });

    // Save Material in the database
    try {
        const result = await data.save();
        res.json({
            message: "Success",
            data: result
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while creating the Material."
        });
    }
}

// Retrieve all Materials from the database.
const findAll = async (req, res) => {
    try {
        const result = await sub.findAll();
        res.json({
            message: "Success",
            data: result
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving materials."
        });
    }
}

// Find a single Material with an id
const findOne = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await sub.findByPk(id);
        res.json({
            message: "Success",
            data: result
        });
    } catch (err) {
        res.status(500).json({
            message: "Error retrieving Material with id=" + id,
            error: err.message || "Some error occurred while retrieving materials."
        });
    }
}

module.exports = {
    create,
    findAll,
    findOne
}