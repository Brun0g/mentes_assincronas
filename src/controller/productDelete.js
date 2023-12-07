require("dotenv").config();
const { pool } = require("../model/model.js");

const productDelete = async (req, res) => {
    const { id } = req.params;

    try {
        const idProduct = await pool.query("SELECT COUNT(id) FROM produtos WHERE id = $1", [id]);

        if (idProduct.rows[0].count === "0") {
            return res.status(400).json({ message: "Product not found!" });
        }

        const result = await pool.query("DELETE FROM produtos WHERE id = $1 RETURNING *", [id]);

        const deletedProduct = result.rows[0];

        return res.status(200).json();
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = productDelete;
