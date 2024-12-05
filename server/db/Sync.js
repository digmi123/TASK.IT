require("dotenv").config({ path: "../.env" });
const { sequelize } = require("./index");

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synced successfully!");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });
