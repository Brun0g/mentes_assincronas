require("dotenv").config();
const { pool } = require("../model/model");

const clientValidation = async (req, res, next) => {
    const { nome, email, cpf, cep } = req.body;

    try {
        if (!nome || !email || !cpf) {
            return res.status(400).json({ mensagem: "All fields are mandatory." });
        }
        if (!email.includes("@")) {
            return res.status(400).json({ mensagem: "invalid email." });
        }
        const existingEmail = await pool.query("select * from clientes where email = $1", [email]);
        if (existingEmail.rowCount >= 1) {
            return res.status(404).json({ mensagem: "There is already a registered user with the email provided." });
        }
        const formatCpf = cpf.split('');
        if (formatCpf.length !== 11) {
            return res.status(400).json({ mensagem: 'invalid cpf.' });
        }
        const formatCep = cep.split('');
        if (formatCep.length !== 8) {
            return res.status(400).json({ mensagem: 'invalid cep.' });
        }

        next()
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "client validation error" });
    }
};

module.exports = clientValidation;