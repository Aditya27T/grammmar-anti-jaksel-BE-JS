const model = require('../repositories');
const Material = model.material;
const sub = model.submaterial;

// Create and Save a new Material
const create = (req, res) => {
    const {judul, materi1, categoryId } = req.body;

    if (!judul || !materi1 || !categoryId) {
        return res.status(400).json({
            message: "Content can not be empty!"
        });
    }
    const data = new Material({
        judul, materi1, categoryId
    });

    // Save Material in the database
    data.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).josn({
            message: err.message || "Some error occurred while creating the Material."
        });
    });
};

// Retrieve all Materials from the database.
const findAll = (req, res) => {
    Material.findAll()
    .then(data => {
        res.json({
            message: "Success",
            data: data
        });
    }).catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving materials."
        });
    });
}

// Find a single Material with an id
const findOne = (req, res) => {
    const id = req.params.id;

    Material.findByPk(id, {
        include: [
            {
                model: model.category,
                as: "category",
                attributes: ["id", "name"]
            },
            {
                model: model.subMaterial,
                as: "subMaterial",
                attributes: ["id", "judul", "materi1", "categoryId"]
            }
        ]
    })
    .then(data => {
        res.json({
            message: "Success",
            data: data
        });
    }).catch(err => {
        res.status(500).json({
            message: "Error retrieving Material with id=" + id,
            error: err.message || "Some error occurred while retrieving materials."
        });
    });
}

// Update a Material by the id in the request
const update = async (req, res) => {
    const id = req.params.id;
    const {judul, materi1, categoryId } = req.body;

    if (!judul || !materi1 || !categoryId) {
        return res.status(400).json({
            message: "Content can not be empty!"
        });
    }

    Material.update({
        judul, materi1, categoryId
    }, {
        where: { id: id }
    })

    const data = await Material.findByPk(id);

    if (!data) {
        return res.status(400).json({
            message: "Material not found"
        });
    } else {
        res.json({
            message: "Success",
            data: data
        });
    }
}

// Delete a Material with the specified id in the request
const destroy = async (req, res) => {
    // delet marterial include delete sub material
    const id = req.params.id;
    const subFind = await sub.findOne({
        where: { categoryId: id }
    });

    if (subFind) {
        await sub.destroy({
            where: { categoryId: id }
        });
    }

    Material.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.json({
                message: "Material was deleted successfully!"
            });
        } else {
            res.json({
                message: `Cannot delete Material with id=${id}. Maybe Material was not found!`
            });
        }
    }).catch(err => {
        res.status(500).json({
            message: "Could not delete Material with id=" + id,
            error: err.message || "Some error occurred while deleting the Material."
        });
    });
}

module.exports = {
    create,
    findAll,
    findOne,
    update,
    destroy
}