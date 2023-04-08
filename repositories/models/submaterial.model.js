const submaterial = (sequelize, DataTypes) => {
    const Submaterial = sequelize.define('submaterial', {
        judul: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        submateri: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return Submaterial;
};

module.exports = submaterial;