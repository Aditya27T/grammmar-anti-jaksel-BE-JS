const quiz = ( sequelize, DataTypes ) => {
    const Quiz = sequelize.define('quiz', {
        question: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        key: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        a: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        b: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        c: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        d: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return Quiz;
}

module.exports = quiz;