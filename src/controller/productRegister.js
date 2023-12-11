require("dotenv").config();
const { pool } = require("../model/model.js");

const productRegister = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id, produto_imagem } = req.body;

  if (!descricao || !quantidade_estoque || !valor || !categoria_id || !produto_imagem) {
    return res.status(400).json({ message: "All fields are mandatory!" });
  }

  if (quantidade_estoque <= 0 || isNaN(quantidade_estoque)) {
    return res.status(400).json({ message: "The stock quantity must be a positive integer!" });
  }

  if (valor <= 0 || isNaN(valor)) {
    return res.status(400).json({ message: "The product price must be a positive integer!" });
  }

  try {
    const result = await pool.query("INSERT INTO produtos (descricao, quantidade_estoque, valor, categoria_id, produto_imagem) VALUES ($1, $2, $3, $4, $5) RETURNING id, descricao, quantidade_estoque, valor, categoria_id, produto_imagem", [
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
      produto_imagem,
    ]);

    const insertedProduct = result.rows[0];

    return res.status(201).json(insertedProduct);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = productRegister;
