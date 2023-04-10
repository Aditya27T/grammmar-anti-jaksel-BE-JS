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
        const result = await Quiz.findAll({
            include: [
                {
                    model: model.category,
                    as: "category",
                    attributes: ["id", "name"]
                },
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt", "categoryId"]
            }
        });
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
        const result = await Quiz.findOne({
            where: { id: id },
            include: [
                {
                    model: model.category,
                    as: "category",
                    attributes: ["id", "name"]
                },
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt", "categoryId"]
            }
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

const submitOne = async (req, res) => {
    const { id, jawaban } = req.body;

    try {
        const result = await Quiz.findOne({
            where: { id: id }
        });

        if (jawaban === result.key) {
            res.json({
                message: "Success",
                data: true
            });
        } else {
            res.json({
                message: "Success",
                data: false,
                trueAnswer: result.key
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error retrieving Quiz with id=" + id,
            error: err.message || "Some error occurred while retrieving quizzes."
        });
    }
}

const submitMany = async (req, res) => {
    const { id, jawaban } = req.body;

    try {
        const outcome = []
        const result = {}
        let correctAnswer = 0
        let wrongAnswer = 0
        
        for (let i = 0; i < id.length; i++) {
            const quiz = await Quiz.findOne({
                where: { id: id[i], key: jawaban[i] }
            });
            if (quiz !== null) {
                correctAnswer++
                outcome.push(id, true)
            } else {
                wrongAnswer++
                outcome.push(id, false)
            }
        }

        result.correctAnswer = correctAnswer
        result.wrongAnswer = wrongAnswer
        result.outcome = outcome

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

const findByCategoryId = async (req, res) => {
    const categoryId = req.params.categoryId;

    try {
        await Quiz.findAll({
            where: { categoryId: categoryId },  attributes: {
                exclude: ["createdAt", "updatedAt", "categoryId"]
            }, 
            include: [
                {
                    model: model.category,
                    as: "category",
                    attributes: ["id", "name"]
                },
            ],
        }) 
        .then(data => {
            res.json({
                message: "Success",
                data: data
            });
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving quizzes.",
            data: null
        });
    }

}

module.exports = 
{
    create,
    findAll,
    findOne,
    findByCategoryId,
    update,
    destroy,
    submitOne,
    submitMany,
}