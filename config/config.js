require("dotenv").config();

module.exports = {
  production: {
    username: process.env.DB_PROD_USER,
    password: process.env.DB_PROD_PASSWORD,
    database: process.env.DB_PROD_NAME,
    host: process.env.DB_PROD_HOST,
    dialect: "postgres"
  },
  staging: {
    username: process.env.DB_STAGING_USER,
    password: process.env.DB_STAGING_PASSWORD,
    database: process.env.DB_STAGING_NAME,
    host: process.env.DB_STAGING_HOST,
    dialect: "postgres"
  },
  local: {
    username: process.env.DB_LOCAL_USER,
    password: process.env.DB_LOCAL_PASSWORD,
    database: process.env.DB_LOCAL_NAME,
    host: process.env.DB_LOCAL_HOST,
    dialect: "postgres"
  }
};
