'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class quiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  quiz.init({
    question: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Question is required',
        }
      }
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Answer is required',
        }
      }
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
      validate: {
        notEmpty: {
          msg: 'Category is required',
        }
      },
      references: {
        model: 'categories',
        key: 'id'
      },
      exclude: ['createdAt', 'updatedAt']
    },
  }, {
    sequelize,
    modelName: 'quiz',
    tableName: 'quizzes',
  });
  return quiz;
};