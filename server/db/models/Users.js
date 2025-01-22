const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Users = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },

  // Fields for credential-based login
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  // Fields for Google OAuth users
  googleId: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  isGoogleUser: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Users;
