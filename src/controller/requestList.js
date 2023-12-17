require("dotenv").config();
const { pool } = require("../model/model.js");

const requestList = async (req, res) => {
    try {
        const { cliente_id } = req.query;

        let query = "SELECT * FROM pedidos";
        let queryParams = [];

        if (cliente_id) {
            query += " WHERE cliente_id = $1";
            queryParams.push(parseInt(cliente_id));
        }

        const ordersResult = await pool.query(query, queryParams);
        const orders = ordersResult.rows;

        const ordersWithProducts = [];

        for (const order of orders) {
            const orderProductsResult = await pool.query("SELECT * FROM pedido_produtos WHERE pedido_id = $1", [order.id]);
            const orderProducts = orderProductsResult.rows;

            ordersWithProducts.push({
                pedido: order,
                pedido_produtos: orderProducts,
            });
        }

        return res.status(200).json(ordersWithProducts);
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

module.exports = requestList;
