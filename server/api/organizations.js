const express = require("express");
const router = express.Router();
const db = require("../db");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  const loggedUser = req.user;
  const organizations = await db.Organizations.findAll({
    // where: {
    //   [Op.or]: [{ "$members.id$": loggedUser.id }, { owner_id: loggedUser.id }],
    // },
    include: [
      {
        model: db.User,
        as: "owner",
      },
      {
        model: db.User,
        as: "members",
      },
    ],
  });

  // organizations.forEach((organization) =>
  //   organization.members.push(organization.owner)
  // );
  return res.json(organizations);
});

router.get("/:organizationId/members", async (req, res) => {
  const organizationId = Number(req.params.organizationId);
  const organization = await db.Organizations.findOne({
    where: { id: organizationId },
    include: { model: db.User, as: "members" },
  });

  res.status(200).json(organization.members);
});

router.get("/:organizationId", async (req, res) => {
  const { organizationId } = req.params;
  const organization = await db.Organizations.findOne({
    where: { id: organizationId },
    include: [
      {
        model: db.User,
        as: "owner",
      },
      {
        model: db.User,
        as: "members",
      },
    ],
  });
  return res.json(organization);
});

module.exports = router;
