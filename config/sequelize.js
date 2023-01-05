const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  database: "mern-v2",
  host: "localhost",
  username: "root",
  password: "root",
  dialect: "mysql",
});

//testing connnect
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
