const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Users = require("./Users");

const Organization = sequelize.define("organization", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Define Associations
Users.belongsToMany(Organization, {
  as: "organizations",
  through: { model: "users_organiztions" },
  foreignKey: "user_id",
}); // Many-to-Many
Organization.belongsToMany(Users, {
  as: "members",
  through: { model: "users_organiztions" },
  foreignKey: "organization_id",
}); // Many-to-Many

Organization.belongsTo(Users, { foreignKey: "owner_id", as: "owner" }); // One-to-Many

module.exports = Organization;
