const { pool } = require("../model/model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../middleware/token");

const loginUser = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const userWithEmail = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);

    if (userWithEmail.rowCount < 1) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    if (!senha || !userWithEmail.rows[0].senha) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const validPassword = await bcrypt.compare(senha, userWithEmail.rows[0].senha);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: userWithEmail.rows[0].id }, jwtSecret, { expiresIn: "8h" });
    const { senha: _, ...loggedInUser } = userWithEmail.rows[0];

    return res.json({ user: loggedInUser, token });
  } catch (error) {
    return res.status(500).json({ message: "Unexpected server error!" + error.message });
  }
};

module.exports = { loginUser };
