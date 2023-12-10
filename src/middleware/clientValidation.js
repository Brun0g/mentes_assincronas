require("dotenv").config();
const { pool } = require("../model/model");

const validateEmail = (email) => {
    return email.includes("@");
};

const validateCpf = (cpf) => {
    const formatCpf = cpf.split('');
    return formatCpf.length === 11;
};

const clientValidation = async (req, res, next) => {
    const { nome, email, cpf } = req.body;

    try {
        if (!nome || !email || !cpf) {
            return res.status(400).json({ mensagem: "All fields are mandatory." });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ mensagem: "Invalid email." });
        }

        const existingEmail = await pool.query("select * from clientes where email = $1", [email]);
        if (existingEmail.rowCount >= 1) {
            return res.status(404).json({ mensagem: "User with the provided email already exists." });
        }

        if (!validateCpf(cpf)) {
            return res.status(400).json({ mensagem: 'Invalid CPF.' });
        }

        const existingCpf = await pool.query("select * from clientes where cpf = $1", [cpf]);
        if (existingCpf.rowCount >= 1) {
            return res.status(404).json({ mensagem: "User with the provided CPF already exists." });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Client validation error." });
    }
};

module.exports = clientValidation;