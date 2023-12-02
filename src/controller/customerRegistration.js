require("dotenv").config();
const { pool } = require('../model/model');

const customerRegistration = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {
        const newCustomer = await pool.query("insert into clientes (nome, email, cpf, cep, rua, numero, bairro, cidade, estado) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *",
            [nome, email, cpf, cep, rua, numero, bairro, cidade, estado]);

        return res.status(201).json(newCustomer);
    } catch (error) {
        return res.status(500).json({ mensagem: "Internal server error" });
    }
}

module.exports = customerRegistration;