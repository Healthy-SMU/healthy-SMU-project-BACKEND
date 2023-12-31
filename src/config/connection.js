const Sequelize = require("sequelize");
const dotenv = require("dotenv");
const mysql = require("mysql2");
dotenv.config();
console.log("URL:", process.env.URL);
const sequelize=new Sequelize(process.env.URL,{
    dialect: 'mysql' 
});

const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected to MySQL successfully.");
        await sequelize.sync();
    } catch (error) {
        console.error('Connection to MYSQL failed:', error);
    } 
};

module.exports = {connectDb,sequelize};