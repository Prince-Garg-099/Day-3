const { Sequelize, DataTypes, UUIDV4 } = require('sequelize');

const sequelize = new Sequelize('task-3', 'root', null, {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});
module.exports = sequelize;
