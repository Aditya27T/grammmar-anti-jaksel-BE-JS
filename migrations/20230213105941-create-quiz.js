'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('quizzes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Question is required',
          }
        }
      },
      answer: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Answer is required',
          }
        }
      },
      a: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      b: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      c: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      d: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      categoryId: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Category is required',
          }
        },
        // references: {
        //   model: 'categories',
        //   key: 'id'
        // },
        exclude: ['createdAt', 'updatedAt']
      },
      levelId: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Level is required',
          }
        },
        // references: {
        //   model: 'levels',
        //   key: 'id'
        // },
        exclude: ['createdAt', 'updatedAt']
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('quizzes');
  }
};