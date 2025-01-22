const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);
const jwt = require("jsonwebtoken");

const authenticateToken = async (req, res, next) => {
  const authCookie = req.cookies["auth-token"];
  console.log({ authCookie });

  if (authCookie == null) return res.sendStatus(401);
  jwt.verify(authCookie, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log("JWT verification error:", err);
      return res.sendStatus(403); // Invalid token
    }

    // Attach user data from the token to the request object
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
