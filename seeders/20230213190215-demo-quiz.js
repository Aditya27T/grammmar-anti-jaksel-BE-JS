'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('quizzes', [
    {
      question: 'What is the capital of the Philippines?',
      answer: 'a',
      a: 'Manila',
      b: 'Quezon City',
      c: 'Cebu City',
      d: 'Davao City',
      categoryId: 1,
      levelId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      question: 'What is the capital of the United States?',
      answer: 'a',
      a: 'Washington, D.C.',
      b: 'New York City',
      c: 'Los Angeles',
      d: 'Chicago',
      categoryId: 1,
      levelId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      question: 'What is the capital of the United Kingdom?',
      answer: 'a',
      a: 'London',
      b: 'Manchester',
      c: 'Birmingham',
      d: 'Liverpool',
      categoryId: 1,
      levelId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      question: 'siapakah messi?',
      answer: 'a',
      a: 'seorang pemain sepak bola',
      b: 'seorang pemain bola voli',
      c: 'seorang pemain bola basket',
      d: 'seorang pemain bola tenis',
      categoryId: 2,
      levelId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      question: 'siapakah ronaldo?',
      answer: 'a',
      a: 'seorang pemain sepak bola',
      b: 'seorang pemain bola voli',
      c: 'seorang pemain bola basket',
      d: 'seorang pemain bola tenis',
      categoryId: 2,
      levelId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      question: 'siapakah kareem abdul jabbar?',
      answer: 'c',
      a: 'seorang pemain sepak bola',
      b: 'seorang pemain bola voli',
      c: 'seorang pemain bola basket',
      d: 'seorang pemain bola tenis',
      categoryId: 2,
      levelId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
   ]);  
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
