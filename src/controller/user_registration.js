const { pool } = require('../model/model');
const bcrypt = require('bcrypt');

const userRegistration = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const encryptedPass = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            'insert into usuarios (nome, email, senha) values ($1, $2, $3) returning *',
            [name, email, encryptedPass]
        );
        const { senha: _, ...userRegistration } = newUser.rows[0];

        return res.status(201).json(userRegistration);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Internal server error' })
    }
};

module.exports = {
    userRegistration
}