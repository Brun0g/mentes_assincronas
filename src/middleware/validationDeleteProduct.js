// middleware/validationDeleteProduct.js

const { pool } = require("../model/model.js");

const validationDeleteProduct = async (req, res, next) => {
    try {
        const idProduct = req.params.id;
        const result = await pool.query("SELECT COUNT(*) FROM pedido_produtos WHERE produto_id = $1", [idProduct]);
        const productCountInOrders = parseInt(result.rows[0].count);

        if (productCountInOrders > 0) {

            return res.status(400).json({ mensagem: "Cannot delete the product as it is associated with orders." });
        }

        next();
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

module.exports = validationDeleteProduct;
