require('dotenv').config();

module.exports = {
  development: {
    databaseUrl: process.env.DATABASE_URL,
    dialect: 'mysql',
  },
  production: {
  },
};
