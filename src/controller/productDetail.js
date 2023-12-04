require("dotenv").config();
const { pool } = require("../model/model.js");

const productDetail = async (req, res) => {
    const { id } = req.params;

    try {
        const idProduct = await pool.query("SELECT COUNT(id) FROM produtos WHERE id = $1", [id]);

        if (idProduct.rows[0].count === "0") {
            return res.status(400).json({ message: "Product not found!" });
        }

        const result = await pool.query("SELECT id, descricao, quantidade_estoque, valor, categoria_id FROM produtos WHERE id = $1", [id]);

        const selectedProduct = result.rows[0];

        return res.status(200).json({ produto: selectedProduct });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = productDetail;
