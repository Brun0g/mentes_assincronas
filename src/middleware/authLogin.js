const { pool } = require("../model/model");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../middleware/token");

const authenticateLogin = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "To access this resource, a valid authentication token must be sent." });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, jwtSecret);
    const { rows, rowCount } = await pool.query("SELECT * FROM usuarios WHERE id = $1", [id]);

    if (rowCount < 1) {
      return res.status(401).json({ message: "To access this resource, a valid authentication token must be sent." });
    }

    req.usuario = rows[0];
    next();
  } catch (error) {
    return res.status(401).json({ message: "To access this resource, a valid authentication token must be sent." });
  }
};

module.exports = authenticateLogin;
