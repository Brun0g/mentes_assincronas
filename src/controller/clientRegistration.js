require("dotenv").config();
const { pool } = require('../model/model');

const clientRegistration = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {
        const newClient = await pool.query("insert into clientes (nome = $1, email = $2, cpf = $3, cep = $4, rua = $5, numero = $6, bairro = $7, cidade = $8, estado = $9)",
            [nome, email, cpf, cep, rua, numero, bairro, cidade, estado]);

        return res.status(201).json(newClient.rows[0]);
    } catch (error) {
        return res.status(500).json({ mensagem: "Client registration error" });
    }
}

module.exports = clientRegistration;