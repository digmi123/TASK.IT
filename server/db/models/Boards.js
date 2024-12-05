const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Users = require("./Users");

const Boards = sequelize.define("boards", {
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
  // owner_id: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  // },
});

// Define User Boards associations.
Boards.belongsTo(Users, { foreignKey: "owner_id" });
Users.hasMany(Boards, { foreignKey: "owner_id" });

Boards.belongsToMany(Users, {
  through: { model: "users_boards" },
  foreignKey: "board_id",
  otherKey: "user_id",
  as: "members",
});

Users.belongsToMany(Boards, {
  through: { model: "users_boards" },
  foreignKey: "user_id",
  otherKey: "board_id",
});

module.exports = Boards;
