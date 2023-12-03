const { pool } = require("../model/model");

const updateClient = async (req, res) => {
    const { id } = req.usuario;
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;
    try {
        const idClient = await pool.query("select count(id) from clientes where id = $1", [id])
        if (idClient == 0) {
            return res.status(400).json({ message: "customer not found" })
        }
        const updateClient = await pool.query("update clientes set nome = $1, email = $2, cpf = $3, cep = $4, rua = $5, numero = $6, bairro = $7, cidade = $8, estado = $9 where id = $10",
            [nome, email, cpf, cep, rua, numero, bairro, cidade, estado, id]);

        return res.status(201).json(updateClient.rows[0]);
    } catch (error) {
        return res.status(400).json({ message: "Client update error." });
    }
};

module.exports = updateClient;