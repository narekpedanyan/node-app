const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'node-app',
    'root',
    'devnarek..', {
        dialect: 'mysql',
        host: 'localhost',
    }
);

module.exports = sequelize;