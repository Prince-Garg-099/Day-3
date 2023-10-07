const { DataTypes } = require('sequelize');

const sequelize = require("../dbconnection.js");

const User = sequelize.define('users', {

    
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "Must be a valid email address",
            }
        }
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    usertype: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
            notNull: {
                msg: 'The type of user must be defined'
            }
        }
    },

    token: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "token"
    },
    tokenexp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Date.now(),
    }

});

sequelize.sync();


module.exports = User;