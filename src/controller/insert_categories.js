require("dotenv").config();
const { pool } = require("../model/model.js");

const insertCategories = async (req, res) => {
  const { descricao } = req.body;

  if (!descricao) {
    return res.status(400).json({ message: "Description must be fi lled." });
  }

  try {
    await pool.query("INSERT INTO categorias (descricao) VALUES ($1) returning id, descricao", [descricao]);
    return res.status(201).send();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = insertCategories;
