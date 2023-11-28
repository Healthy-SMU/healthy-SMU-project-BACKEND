const { Sequelize , DataTypes} = require("sequelize"); 
const {sequelize}=require("../config/connection");

const Healthcare_professional = sequelize.define(
    "Healthcare_professional",
    {
        healthcare_professionalID: {
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

      firstname: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },

      lastname: {
        type: DataTypes.STRING(20),
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

      career: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },

      category: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },

    },
    {
        tableName: "Healthcare_professional",
        timestamps: false,
        //underscored: true,
    }
    );

    module.exports = {Healthcare_professional};