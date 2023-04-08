const youtube = ( sequelize, DataTypes ) => {
    const Youtube = sequelize.define('youtube', {
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return Youtube;
}