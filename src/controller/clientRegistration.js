require("dotenv").config();
const { pool } = require('../model/model');

const clientRegistration = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {
        const newClient = await pool.query(
            "insert into clientes (nome, email, cpf, cep, rua, numero, bairro, cidade, estado) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *",
            [nome, email, cpf, cep, rua, numero, bairro, cidade, estado]
        );

        return res.status(201).json(newClient.rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Client registration error" });
    }
}

module.exports = clientRegistration;
