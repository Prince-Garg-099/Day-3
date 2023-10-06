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

const Note = sequelize.define('notes', {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },

    desc: {
        type: DataTypes.STRING,
        allowNull: false,
    },



});

sequelize.sync();
module.exports = Note;