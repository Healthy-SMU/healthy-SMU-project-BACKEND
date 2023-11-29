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

  date_and_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  day: {
    type: DataTypes.STRING(20),
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
