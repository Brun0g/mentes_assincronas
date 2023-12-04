require("dotenv").config();
const { pool } = require("../model/model");
const bcrypt = require("bcrypt");

const userRegistration = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const encryptedPass = await bcrypt.hash(senha, 10);
    const newUser = await pool.query("insert into usuarios (nome, email, senha) values ($1, $2, $3) returning *", [nome, email, encryptedPass]);
    const { senha: _, ...userRegistration } = newUser.rows[0];

    return res.status(201).json(userRegistration);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "user registration error." });
  }
};

module.exports = userRegistration;
