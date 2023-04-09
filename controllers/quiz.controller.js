const model = require('../repositories');
const Quiz = model.quiz;

// Create and Save a new Quiz
const create = async (req, res) => {
    const { question, key, a, b, c, d, categoryId } = req.body;

    if (!question || !key || !a || !b || !c || !d || !categoryId) {
        return res.status(400).json({
            message: "Content can not be empty!"
        });
    }

    const data = new Quiz({
        question, key, a, b, c, d, categoryId
    });

    // Save Quiz in the database
    try {
        const result = await data.save();
        res.json({
            message: "Success",
            data: result
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message || "Some error occurred while creating the Quiz."
        });
    }
};

// Retrieve all Quizzes from the database.
const findAll = async (req, res) => {
    try {
        const result = await Quiz.findAll();
        res.json({
            message: "Success",
            data: result
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving quizzes."
        });
    }
}

// Find a single Quiz with an id
const findOne = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await Quiz.findByPk(id, {
            include: [
                {
                    model: model.category,
                    as: "category",
                    attributes: ["id", "name"]
                }
            ]
        });
        res.json({
            message: "Success",
            data: result
        });
    } catch (err) {
        res.status(500).json({
            message: "Error retrieving Quiz with id=" + id,
            error: err.message || "Some error occurred while retrieving quizzes."
        });
    }
}

// Update a Quiz by the id in the request
const update = async (req, res) => {
    const id = req.params.id;
    const { question, key, a, b, c, d, categoryId } = req.body;

    if (!question || !key || !a || !b || !c || !d || !categoryId) {
        return res.status(400).json({
            message: "Content can not be empty!"
        });
    }

    try {
        const result = await Quiz.update({
            question, key, a, b, c, d, categoryId
        }, {
            where: { id: id }
        });
        res.json({
            message: "Success",
            data: result
        });
    } catch (err) {
        res.status(500).json({
            message: "Error updating Quiz with id=" + id,
            error: err.message || "Some error occurred while updating the Quiz."
        });
    }
}

// Delete a Quiz with the specified id in the request
const destroy = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await Quiz.destroy({
            where: { id: id }
        });
        res.json({
            message: "Success",
            data: result
        });
    } catch (err) {
        res.status(500).json({
            message: "Could not delete Quiz with id=" + id,
            error: err.message || "Some error occurred while removing the Quiz."
        });
    }
}


module.exports = {
    create,
    findAll,
    findOne,
    update,
    destroy
}