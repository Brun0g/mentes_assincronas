const { pool } = require("../model/model");

const updateClient = async (req, res) => {
    const { id } = req.params;
    const { nome, email, cpf } = req.body;
    try {
        const idClient = await pool.query("select count(id) from clientes where id = $1", [id])
        if (idClient == 0) {
            return res.status(400).json({ message: "customer not found" })
        }
        const updateClient = await pool.query(
            "update clientes set nome = $1, email = $2, cpf = $3 where id = $4 returning *",
            [nome, email, cpf, id]
        );

        return res.status(201).json(updateClient.rows[0]);
    } catch (error) {
        return res.status(400).json({ message: "Client update error." });
    }
};

module.exports = updateClient;