const { pool } = require("../model/model.js");
require("dotenv").config();

const detailClient = async (req, res) => {
    try {
        const { id } = req.params;

        const clientCount = await pool.query("select count(id) from clientes where id = $1", [id]);
        if (clientCount.rows[0].count === '0') {
            return res.status(404).json({ message: "Client not found." });
        }

        const clientDetails = await pool.query("select * from clientes where id = $1", [id]);

        return res.status(200).json(clientDetails.rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error detailing clients." });
    }
};

module.exports = detailClient;
