const { Sequelize , DataTypes} = require("sequelize"); 
const {sequelize}=require("../config/connection");

const Student = sequelize.define(
    "Student",
    {
      StudentID: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      email_address: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },

      fullname: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },

      password: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      phone_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },

    },
    {
        tableName: "Student",
        timestamps: false,
        //underscored: true,
        
    }
    );

    module.exports = {Student};