const { Sequelize , DataTypes} = require("sequelize"); 
const {sequelize}=require("../config/connection");
const {Student} = require("./Student");
const {Healthcare_professional} = require("./Healthcare_professional");


const Appointment = sequelize.define('Appointment', {
  
  appointmentID: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },

  reason_of_appointment: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },

  room_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },

  start_date_time: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'start_time_and_date'
  },

  end_date_time: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'end_time_and_date'
  },

  comment: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },

  studentID: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },

  healthcare_professionalID: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },

}, 
{
    tableName: 'Appointment',
    timestamps: false,
    //underscored: true,
}
);

// appointment student association 
Student.hasMany(Appointment, {
  foreignKey: "studentID",});
Appointment.belongsTo(Student, {
  foreignKey: "studentID",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});

// appointment healthcare_professional association
Healthcare_professional.hasMany(Appointment, {
  foreignKey: "healthcare_professionalID",});
Appointment.belongsTo(Healthcare_professional, {
  foreignKey: "healthcare_professionalID",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});

module.exports = {Appointment};
