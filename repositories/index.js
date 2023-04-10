const { production, development, NODE_ENV } = require('../config/db');
const Sequelize = require('sequelize');
const quizModel = require('./models/quiz.model');
const categoryModel = require('./models/category.model');
const materialModel = require('./models/material.model');
const youtubeModel = require('./models/youtube.model');
const subMaterialModel = require('./models/submaterial.model');


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

db.material.hasOne(db.submaterial, { foreignKey: 'materialId' }, { onDelete: 'cascade' }, { hooks: true });
db.submaterial.belongsTo(db.material, { foreignKey: 'materialId' }, { onDelete: 'cascade' }, { hooks: true });

//sync all defined models to the DB
if (NODE_ENV === 'development') {
    sequelize.sync({ force: true })
        .then(() => {
            console.log(`Database & tables created!`)
        });
} else if (NODE_ENV === 'production') {
    sequelize.sync()
        .then(() => {
            console.log(`sync all defined models to the DB`)
        });
} else {
    console.log('No environment specified');
}


module.exports = db;