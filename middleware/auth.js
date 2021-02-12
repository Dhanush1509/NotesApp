const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) res.status(401).json({ message: "authorisation denied" });
  try {
    const decoded = jwt.verify(token, config.get("JsonSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).send("Authorisation denied");
  }
};
