require("dotenv").config();
const { pool } = require("../model/model");

const registrationValidation = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ mensagem: "All fields are mandatory." });
    }
    if (!email.includes("@")) {
      return res.status(400).json({ mensagem: "invalid email." });
    }
    const existingEmail = await pool.query("select * from usuarios where email = $1", [email]);
    if (existingEmail.rowCount >= 1) {
      return res.status(404).json({ mensagem: "There is already a registered user with the email provided." });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Internal server error" });
  }
};
module.exports = {
  registrationValidation,
};
