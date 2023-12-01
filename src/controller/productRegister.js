require("dotenv").config();
const { pool } = require("../model/model.js");

const productRegister = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    if (!descricao || !quantidade_estoque || !valor || !categoria_id) {
        return res.status(400).json({ message: "All fields are mandatory!" });
    }

    try {
        const result = await pool.query("INSERT INTO produtos (descricao, quantidade_estoque, valor, categoria_id) VALUES ($1, $2, $3, $4) RETURNING id, descricao, quantidade_estoque, valor, categoria_id", [descricao, quantidade_estoque, valor, categoria_id]);

        const insertedProduct = result.rows[0];

        return res.status(201).json({ message: "Product registered successfully!", product: insertedProduct });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = productRegister;