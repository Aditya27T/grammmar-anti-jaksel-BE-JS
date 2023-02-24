const { quiz, level, category } = require('../models');

// GET /quizzes
const getQuiz = async (req, res) => {
    const {offset, limit} = req.query;
    try {
        const quizzes = await quiz.findAndCountAll({
            include: [
                {
                    model: category,
                    as: 'category',
                    attributes: ['name'],
                },
                {
                    model: level,
                    as: 'level',
                    attributes: ['name'],
                }
            ],
            attributes: {
                exclude: ['categoryId', 'levelId']
            },
            // limit: limit,
            // offset: offset
        });
        if (quizzes === null) {
            res.status(404).json({
                message: 'Failed',
                data: 'Quiz not found'
            });
        } else {
            res.status(200).json({
                message: 'Success',
                data: quizzes
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Failed',
            data: error.message
        }).render('error', { error: error });
    }
};

// GET /quizzes?category=1
const getQuizByCategory = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const quizzes = await quiz.findAll({
            where: { categoryId: categoryId },
            include: [
                {
                    model: category,
                    as: 'category',
                    attributes: ['name'],
                },
                {
                    model: level,
                    as: 'level',
                    attributes: ['name'],
                }

            ],
            attributes: {
                exclude: ['categoryId', 'levelId', 'createdAt', 'updatedAt']
            }
        });
        if (quizzes === null) {
            res.status(404).json({
                message: 'Failed',
                data: 'Quiz not found'
            });
        } else {
            res.status(200).json({
                message: 'Success',
                data: quizzes
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed',
            data: error.message
        });
    }
};

// GET /quizzes?level=1
const getQuizByLevel = async (req, res) => {
    const { levelId } = req.params;
    try {
        const quizzes = await quiz.findAll({
            where: { levelId: levelId },
            include: [
                {
                    model: level,
                    as: 'level',
                    attributes: ['name'],
                }

            ],
            attributes: {
                exclude: ['categoryId', 'CategoryId', 'levelId', 'createdAt', 'updatedAt']
            }
        });
        if (quizzes === null) {
            res.status(404).json({
                message: 'Failed',
                data: 'Quiz not found'
            });
        } else {
            res.status(200).json({
                message: 'Success',
                data: quizzes
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed',
            data: error.message
        });
    }
};
            

// GET /quizzes/:id
const getQuizById = async (req, res) => {
    try {
        const { id } = req.params;
        const quizzes = await quiz.findOne({
            where: { id },
            include: [
                {
                    model: category,
                    as: 'category',
                    attributes: ['name'],
                },
                {
                    model: level,
                    as: 'level',
                    attributes: ['name'],
                }
            ],
            attributes: {
                exclude: ['categoryId', 'levelId']
            }
        });
        if (quizzes !== null) {
            res.status(200).json({
                message: 'Success',
                data: quizzes
            });
        } else {
            res.status(404).json({
                message: 'Failed',
                data: 'Quiz not found'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed',
            data: error.message
        });
    }  
};

// POST /quizzes
const postQuiz = async (req, res) => {
    const { question, a, b, c, d, categoryId, levelId } = req.body;
    try {
        const quizzes = await quiz.create({
            question,
            a,
            b,
            c,
            d,
            categoryId,
            levelId
        });
        if (quizzes === null) {
            res.status(400).json({
                message: 'Failed',
                data: 'Quiz not created'
            });
        } else {
            res.status(201).json({
                message: 'Success',
                data: quizzes
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed',
            data: error.message
        });
    }
};

// PUT /quizzes/:id
const putQuiz = async (req, res) => {
    const { id } = req.params;
    const { question, a, b, c, d, categoryId, levelId } = req.body;
    try {
        const quizzes = await quiz.update({
            question,
            a,
            b,
            c,
            d,
            categoryId,
            levelId
        }, {
            where: { id }
        });
        if (quizzes === null) {
            res.status(400).json({
                message: 'Failed',
                data: 'Quiz not updated'
            });
        } else {
            res.status(200).json({
                message: 'Success',
                data: quizzes
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed',
            data: error.message
        });
    }
};

// DELETE /quizzes/:id
const deleteQuiz = async (req, res) => {
    const { id } = req.params;
    try {
        const quizzes = await quiz.destroy({
            where: { id }
        });
        if (quizzes === null) {
            res.status(400).json({
                message: 'Failed',
                data: 'Quiz not deleted'
            });
        } else {
            res.status(200).json({
                message: 'Success',
                data: quizzes
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed',
            data: error.message
        });
    }
};

module.exports = {
    getQuiz,
    getQuizById,
    postQuiz,
    putQuiz,
    deleteQuiz,
    getQuizByCategory,
    getQuizByLevel
};

