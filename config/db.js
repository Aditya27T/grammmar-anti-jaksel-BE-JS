require ('dotenv').config();

module.exports = {
    development: {
        username: 'root',
        password: process.env.PASSWORD||'',
        database: process.env.DATABASE||'db_grammar',
        host: process.env.DB_HOST||'localhost',
        dialect: 'mysql',
        operatorsAliases: false,
        logging: false,
        pool : {
            max : 5,
            min : 0,
            acquire : 30000,
            idle : 10000
        }
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME_PROD,
        host: process.env.DB_HOST,
        dialect: 'mysql',
        operatorsAliases: false,
        logging: false,
        pool : {
            max : 5,
            min : 0,
            acquire : 30000,
            idle : 10000
        }
    },
    NODE_ENV: process.env.NODE_ENV  
};
