const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authCookie = req.cookies["auth-token"];
  console.log({ authCookie });

  if (authCookie == null) return res.sendStatus(401);
  jwt.verify(authCookie, process.env.JWT_SECRET_KEY, (err, user) => {
    console.log(user);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
