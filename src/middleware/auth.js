const jwt = require("jsonwebtoken");
require("dotenv").config();
function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    res.status(400).json({ msg: "Token inválido ou não fornecido." });
    return;
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      res.status(400).json({ msg: "Token inválido ou não fornecido." });
      return;
    }

    req.session = decoded;
    next();
  });
}

module.exports = authMiddleware;
