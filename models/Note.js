const { DataTypes } = require('sequelize');

const sequelize = require("../dbconnection.js");

const Note = sequelize.define('notes', {

    desc: {
        type: DataTypes.STRING,
        allowNull: false,
    },


});

sequelize.sync();
module.exports = Note;