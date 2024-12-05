const express = require("express");
const { authenticateToken } = require("./middlewares");
const router = express.Router();

router.use("/auth", require("./auth"));

router.use(authenticateToken);
router.use("/users", require("./users"));
router.use("/board", require("./board"));
router.use("/columns", require("./columns"));
router.use("/tasks", require("./tasks"));
router.use("/desks", require("./desks"));

module.exports = router;