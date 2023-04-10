const model = require('../repositories');
const Category = model.category;

const createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const category = await Category.create({ name });
        return res.status(201).json({
            message: 'Category created successfully',
            data: category
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll((
            { attributes: ['id', 'name'], exclude: ['createdAt', 'updatedAt']}
        ));
        return res.status(200).json({ 
            message: 'Categories retrieved successfully',
            data: categories
         });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findOne({
            where: { id: id }
        });
        if (category) {
            return res.status(200).json({ category });
        }
        return res.status(404).send('Category with the specified ID does not exists');
    } catch (error) {

        return res.status(500).send(error.message);
    }
}

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        await Category.update({ name }, { where: { id: id } }); 
        if (!Category) {
            return res.status(404).send('Category with the specified ID does not exists');
        }
        const updatedCategory = await Category.findOne({ where: { id: id }, exclude: ['createdAt']});
        return res.status(200).json({
            message: 'Category updated successfully',
            data: updatedCategory
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Category.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.status(204).json({ message: "Category deleted", deleted });
        }
        throw new Error("Category not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}