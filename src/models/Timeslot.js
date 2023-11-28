const { Sequelize , DataTypes} = require("sequelize"); 
const {sequelize}=require("../config/connection");


const Timeslot = sequelize.define('Timeslot', {

  timeslotID: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  healthcare_professionalID: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    primaryKey: true,
  },

  date: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },

  hour: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },

  status: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },

}, 
{
  tableName: 'Timeslot',
  // primaryKey: { fields: ['timeslotID', 'healthcare_professionalID'] },
  timestamps: false,
  //underscored: true,
});

module.exports = {Timeslot} ;
