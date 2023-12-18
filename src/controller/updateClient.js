const { pool } = require("../model/model");
require("dotenv").config();

const updateClient = async (req, res) => {
    const { id } = req.params;
    const { nome, email, cpf } = req.body;

    try {
        const clientExists = await pool.query("select count(id) from clientes where id = $1", [id]);
        if (clientExists.rows[0].count === '0') {
            return res.status(404).json({ message: "Client not found." });
        }

        const updatedClient = await pool.query(
            "update clientes set nome = $1, email = $2, cpf = $3 where id = $4 returning *",
            [nome, email, cpf, id]
        );

        return res.status(200).json(updatedClient.rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Client update error." });
    }
};

module.exports = updateClient;
