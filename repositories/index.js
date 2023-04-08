const mysql = require('mysql2/promise');
const { production, development, NODE_ENV } = require('../config/db');
const Sequelize = require('sequelize');
const quizModel = require('./models/quiz.model');
const categoryModel = require('./models/category.model');
const materialModel = require('./models/material.model');
const youtubeModel = require('./models/youtube.model');
const subMaterialModel = require('./models/submaterial.model');


mysql.createConnection({
    host: development.host,
    user: development.username,
    password: development.password,
}).then((connection) => {
    connection.query(`CREATE DATABASE IF NOT EXISTS ${development.database};`).then(() => {
        console.log('Database created');
    }).catch((err) => {
        console.log(err);
    });
}).catch((err) => {
    console.log(err);
});

const sequelize = new Sequelize(development.database, development.username, development.password, {
    host: development.host,
    dialect: development.dialect,
    operatorsAliases: development.operatorsAliases,
    logging: development.logging,
    pool: development.pool,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.quiz = quizModel(sequelize, Sequelize);
db.category = categoryModel(sequelize, Sequelize);
db.material = materialModel(sequelize, Sequelize);
db.youtube = youtubeModel(sequelize, Sequelize);
db.submaterial = subMaterialModel(sequelize, Sequelize);

//relations between tables
db.category.hasMany(db.quiz, { foreignKey: 'categoryId' });
db.quiz.belongsTo(db.category, { foreignKey: 'categoryId' });

db.category.hasMany(db.material, { foreignKey: 'categoryId' });
db.material.belongsTo(db.category, { foreignKey: 'categoryId' });

db.category.hasMany(db.youtube, { foreignKey: 'categoryId' });
db.youtube.belongsTo(db.category, { foreignKey: 'categoryId' });

db.material.hasOne(db.submaterial);
db.submaterial.belongsTo(db.material);


//sync all defined models to the DB
if (process.env.NODE_ENV || NODE_ENV  == 'production') {
    sequelize.sync().then(() => {
        console.log('Database synchronized');
    }).catch((err) => {
        console.log(err);
    });
} else {
    sequelize.sync({ force: true }).then(() => {
        console.log('Database synchronized');
    }).catch((err) => {
        console.log(err);
    });
}

module.exports = db;