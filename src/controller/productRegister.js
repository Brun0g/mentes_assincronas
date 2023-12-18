require("dotenv").config();
const { pool } = require("../model/model.js");
const { uploadFile } = require('../middleware/storage');

const productRegister = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const { file } = req
  console.log("Request Body:", req.body);

  if (!descricao || !quantidade_estoque || !valor || !categoria_id) {
    return res.status(400).json({ message: "All fields are mandatory!" });
  }

  if (quantidade_estoque <= 0 || isNaN(quantidade_estoque)) {
    return res.status(400).json({ message: "The stock quantity must be a positive integer!" });
  }

  if (valor <= 0 || isNaN(valor)) {
    return res.status(400).json({ message: "The product price must be a positive integer!" });
  }

  try {
    const arquivo = await uploadFile(
      `imagens/${file.originalname}`,
      file.buffer,
      file.mimetype
    )
    const result = await pool.query("INSERT INTO produtos (descricao, quantidade_estoque, valor, categoria_id, produto_imagem) VALUES ($1, $2, $3, $4, $5) RETURNING id, descricao, quantidade_estoque, valor, categoria_id, produto_imagem", [
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
      arquivo.url,
    ]);

    const insertedProduct = result.rows[0];

    return res.status(201).json(insertedProduct);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" + error.message });
  }
};

module.exports = productRegister;
