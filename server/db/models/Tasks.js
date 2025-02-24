const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Columns = require("./Columns");
const Users = require("./Users");

const Tasks = sequelize.define("tasks", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  priority: {
    type: DataTypes.ENUM("Low", "Medium", "High"),
    allowNull: false,
    defaultValue: "Low",
  },
});

// User Task associations.
Tasks.belongsTo(Users, { foreignKey: "owner_id" }); // Each task has one owner (User)
Users.hasMany(Tasks, { foreignKey: "owner_id" }); // Each user can own many tasks

// Column Task associations.
Tasks.belongsTo(Columns, { foreignKey: "parent_column" });
Columns.hasMany(Tasks, { foreignKey: "parent_column", onDelete: "CASCADE" });

module.exports = Tasks;
