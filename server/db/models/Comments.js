const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Users = require("./Users");
const Tasks = require("./Tasks");

const Comment = sequelize.define("Comment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Users.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(Users, { foreignKey: "userId" });

Tasks.hasMany(Comment, { foreignKey: "taskId" });
Comment.belongsTo(Tasks, { foreignKey: "taskId" });

module.exports = Comment;
