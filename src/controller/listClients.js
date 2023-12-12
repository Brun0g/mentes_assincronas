const { pool } = require("../model/model.js");
require("dotenv").config();

const listClient = async (req, res) => {
    try {
        const client = await pool.query("select * from clientes");

        return res.status(200).json(client.rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error list clients." });
    }
};

module.exports = listClient;