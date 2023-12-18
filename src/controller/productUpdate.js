require("dotenv").config();
const { pool } = require("../model/model.js");
const { uploadFile } = require('../middleware/storage');
const { errorMonitor } = require("nodemailer/lib/xoauth2/index.js");

const productUpdate = async (req, res) => {
    const { id } = req.params;
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const { file } = req

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
        const idProduct = await pool.query("SELECT COUNT(id) FROM produtos WHERE id = $1", [id]);

        if (idProduct.rows[0].count === "0") {
            return res.status(400).json({ message: "Product not found!" });
        }
        const arquivo = await uploadFile(
            `imagens/${file.originalname}`,
            file.buffer,
            file.mimetype
        )

        const result = await pool.query("UPDATE produtos SET descricao = $1, quantidade_estoque = $2, valor = $3, categoria_id = $4, produto_imagem = $5 WHERE id = $6 RETURNING *",
            [descricao, quantidade_estoque, valor, categoria_id, arquivo.url, id]);

        return res.status(200).json(result.rows[0]);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = productUpdate;