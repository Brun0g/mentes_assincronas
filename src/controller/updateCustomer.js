const { pool } = require("../model/model");

const updateCustomer = async (req, res) => {
    const { id } = req.usuario;
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;
    try {
        const idCustomer = await pool.query("select count(id) from clientes where id = $1", [id])
        if (idCustomer == 0) {
            return res.status(400).json({ message: "customer not found" })
        }
        const updatedCustomer = await pool.query("update clientes set nome = $1, email = $2, cpf = $3, cep = $4, rua = $5, numero = $6, bairro = $7, cidade = $8, estado = $9 where id = $10",
            [nome, email, cpf, cep, rua, numero, bairro, cidade, estado, id]);

        return res.status(201).json(updatedCustomer.rows[0]);
    } catch (error) {
        return res.status(400).json({ message: "The provided email is already in use by another user." });
    }
};

module.exports = { updateCustomer };