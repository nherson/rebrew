// use dotenv to pass in a DATABASE_URL
require("dotenv").config();
module.exports = {
  development: {
    dialect: "sqlite",
    storage: "./development.db",
  },
  test: {
    use_env_variable: "DATABASE_URL",
  },
  production: {
    use_env_variable: "DATABASE_URL",
  },
};
