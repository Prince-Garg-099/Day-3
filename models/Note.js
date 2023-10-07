const { DataTypes } = require('sequelize');

const sequelize = require("../dbconnection.js");

// const sequelize = new Sequelize('task-3', 'root', null, {
//     host: 'localhost',
//     dialect: 'mysql'
// });


sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

const Note = sequelize.define('notes', {

   
    desc: {
        type: DataTypes.STRING,
        allowNull: false,
    },



});

sequelize.sync();
module.exports = Note;