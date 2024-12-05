const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Users = require("./Users");
const Boards = require("./Boards");

const Desks = sequelize.define("desks", {
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
  status: {
    type: DataTypes.ENUM("private", "public"),
    allowNull: false,
    defaultValue: "public",
  },
});

// Define User Desks associations.
Desks.belongsTo(Users, { foreignKey: "owner_id" });
Users.hasMany(Desks, { foreignKey: "owner_id" });

Desks.belongsToMany(Users, {
  through: { model: "users_desks" },
  foreignKey: "desk_id",
  otherKey: "user_id",
  as: "collaboartors",
});

Users.belongsToMany(Desks, {
  through: { model: "users_desks" },
  foreignKey: "user_id",
  otherKey: "desk_id",
});

// Desks Board associations.
Boards.belongsTo(Desks, { foreignKey: "parent_desk" });
Desks.hasMany(Boards, { foreignKey: "parent_desk" });

module.exports = Desks;
