const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const db = require("../../db");
const client = new OAuth2Client(process.env.CLIENT_ID);

async function registerOrLoginWithGoogle(googleData) {
  const { email, name, picture, sub: googleId } = googleData;

  // Find the user by email or Google ID
  let user = await db.User.findOne({
    where: { email },
  });
  if (!user) {
    console.log("Starting to create User");
    user = await db.User.create({
      email,
      name,
      picture,
      googleId,
      isGoogleUser: true,
    });
    console.log("New Google user registered:", user);
  } else {
    console.log("Google user logged in");
  }
  return user;
}

router.get("/login", async function (req, res, next) {
  const code = req.query.code;
  try {
    const redirectURL = "http://localhost:8080/api/auth/google/login";
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectURL
    );
    const r = await oAuth2Client.getToken(code);
    await oAuth2Client.setCredentials(r.tokens);
    const user = oAuth2Client.credentials;
    const ticket = await client.verifyIdToken({
      idToken: user.id_token,
      audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const loggedUser = await registerOrLoginWithGoogle(payload);

    const customJwt = jwt.sign(
      loggedUser.dataValues,
      process.env.JWT_SECRET_KEY
    );

    res.cookie("auth-token", customJwt, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
  } catch (err) {
    console.log("Error logging in with OAuth2 user", err);
  }
  return res.redirect(303, "http://localhost:5173/");
});

module.exports = router;
