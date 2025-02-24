const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Boards = require("./Boards");

const Columns = sequelize.define("columns", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define Board Columns associations.
Columns.belongsTo(Boards, { foreignKey: "board_id" });
Boards.hasMany(Columns, { foreignKey: "board_id", onDelete: "CASCADE" });

module.exports = Columns;
