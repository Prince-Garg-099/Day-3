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