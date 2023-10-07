const { Sequelize, DataTypes, UUIDV4 } = require('sequelize');

const sequelize = new Sequelize('task-3', 'root', null, {
    host: 'localhost',
    dialect: 'mysql'
});


module.exports = sequelize;
