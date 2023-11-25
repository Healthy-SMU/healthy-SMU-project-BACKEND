const { Sequelize , DataTypes} = require("sequelize"); 
const {sequelize}=require("../config/connection");
const {Student} = require("./Student");
const {Healthcare_professional} = require("./Healthcare_professional");


const Appointment = sequelize.define('Appointment', {
  
  appointmentID: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    primaryKey: true,
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
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  time: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },

  date: {
    type: DataTypes.STRING(20),
    allowNull: false,
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
    underscored: true,
}
);

// appointment student association 
Student.hasMany(Appointment);
Appointment.belongsTo(Student, {
  foreignKey: "studentID",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});

// appointment healthcare_professional association
Healthcare_professional.hasMany(Appointment);
Appointment.belongsTo(Healthcare_professional, {
  foreignKey: "healthcare_professionalID",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});

module.exports = {Appointment};
