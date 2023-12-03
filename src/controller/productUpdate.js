require("dotenv").config();
const { pool } = require("../model/model.js");

const productUpdate = async (req, res) => {
    const { id } = req.params;
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    if (!descricao || !quantidade_estoque || !valor || !categoria_id) {
        return res.status(400).json({ message: "All fields are mandatory!" });
    }

    try {
        const idProduct = await pool.query("SELECT COUNT(id) FROM produtos WHERE id = $1", [id]);

        if (idProduct.rows[0].count === "0") {
            return res.status(400).json({ message: "Product not found!" });
        }

        const result = await pool.query("UPDATE produtos SET descricao = $1, quantidade_estoque = $2, valor = $3, categoria_id = $4 WHERE id = $5 RETURNING *", [descricao, quantidade_estoque, valor, categoria_id, id]);

        const updatedProduct = result.rows[0];

        return res.status(200).json({ message: "Product updated successfully!", product: updatedProduct });


    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = productUpdate;