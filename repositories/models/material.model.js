const material = ( sequelize, DataTypes ) => {
    const Material = sequelize.define('material', {
        judul: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        materi1: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return Material;
} 

module.exports = material;