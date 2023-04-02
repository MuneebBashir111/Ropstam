const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    res.json({
      type: "Error",
      message: "A token is required for authentication",
    });
    return;
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    res.json({
      type: "Error",
      message: "Invalid Token",
    });
    return;
  }
  return next();
};

module.exports = verifyToken;
