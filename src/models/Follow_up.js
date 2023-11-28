const { Sequelize , DataTypes} = require("sequelize"); 
const {sequelize}=require("../config/connection");
const {Appointment} = require("./Appointment");


const Follow_up = sequelize.define('Follow_up', {

    follow_upID: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    appointmentID: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },

    next_appointmentID: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },

  }, 
  {
    tableName: 'follow_up',
    timestamps: false,
    //underscored: true,
  });
  
  // follow_up appointment association 
  Follow_up.belongsTo(Appointment, {
  foreignKey: "appointmentID",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});

// appointment healthcare_professional association
Follow_up.belongsTo(Follow_up, {
  foreignKey: "next_appointmentID",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});

module.exports = {Follow_up};