const { pool } = require("../model/model");
const bcrypt = require("bcrypt");

const updateUser = async (req, res) => {
  try {
    const { id } = req.usuario;
    const { nome, email, senha } = req.body;
    const hashedPassword = await bcrypt.hash(senha, 10);
    const updatedUser = await pool.query("UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4", [nome, email, hashedPassword, id]);

    return res.status(201).json(updatedUser.rows[0]);
  } catch (error) {
    return res.status(400).json({ message: "The provided email is already in use by another user." });
  }
};

module.exports = { updateUser };
