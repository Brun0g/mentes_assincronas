const { pool } = require("../model/model.js");
require("dotenv").config();

const detailClient = async (req, res) => {
    try {
        const detailClient = await pool.query("select * from clientes");

        return res.json(detailClient.rows);
    } catch (error) {
        return res.status(500).send("Error detailing clients.");
    }
};

module.exports = detailClient;