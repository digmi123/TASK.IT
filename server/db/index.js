const User = require("./models/Users");
const Board = require("./models/Boards");
const Column = require("./models/Columns");
const Task = require("./models/Tasks");
const Desk = require("./models/Desks");

const sequelize = require("./database");

module.exports = { User, Board, Column, Task, Desk, sequelize };
