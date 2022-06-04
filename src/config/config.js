require("dotenv").config();

module.exports = {
  development: {
    username: process.ENV.DEV_DB_USERNAME,
    password: process.ENV.DEV_DB_PASSWORD,
    database: process.ENV.DEV_DB_DB_NAME,
    host: process.ENV.DEV_DB_HOSTNAME,
    port: process.ENV.DEV_DB_PORT,
    dialect: process.ENV.DEV_DB_DIALECT,
  },
  test: {
    username: process.ENV.TEST_DB_USERNAME,
    password: process.ENV.TEST_DB_PASSWORD,
    database: process.ENV.TEST_DB_DB_NAME,
    host: process.ENV.TEST_DB_HOSTNAME,
    port: process.ENV.TEST_DB_PORT,
    dialect: process.ENV.TEST_DB_DIALECT,
  },
  production: {
    username: process.ENV.PROD_DB_USERNAME,
    password: process.ENV.PROD_DB_PASSWORD,
    database: process.ENV.PROD_DB_DB_NAME,
    host: process.ENV.PROD_DB_HOSTNAME,
    port: process.ENV.PROD_DB_PORT,
    dialect: process.ENV.PROD_DB_DIALECT,
  },
};
