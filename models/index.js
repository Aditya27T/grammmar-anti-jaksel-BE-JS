const Sequelize = require('sequelize');
const config = require('../config/config.json');

const sequelize = new Sequelize( config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: config.development.dialect,
  logging: false,
  pool : {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.quiz = require('./quiz')(sequelize, Sequelize);
db.category = require('./category')(sequelize, Sequelize);
db.level = require('./level')(sequelize, Sequelize);

db.quiz.belongsTo(db.category, {foreignKey: 'categoryId', as: 'category', key: 'id'});
db.quiz.belongsTo(db.level, {foreignKey: 'levelId', as: 'level', key: 'id'});
db.category.hasMany(db.quiz);
db.level.hasMany(db.quiz);

module.exports = db;