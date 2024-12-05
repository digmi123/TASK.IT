const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Columns = require("./Columns");

const Tasks = sequelize.define("tasks", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Column Task associations.
Tasks.belongsTo(Columns, { foreignKey: "parent_column" });
Columns.hasMany(Tasks, { foreignKey: "parent_column" });

module.exports = Tasks;
