const { pool } = require('../model/model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../middleware/token');

const registerUser = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const emailExists = await pool.query(
            'SELECT * FROM usuarios WHERE email = $1',
            [email]
        );

        if (emailExists.rowCount === 1) {
            return res.status(400).json({ message: "User with the provided email already exists." });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);

        const newUser = await pool.query(
            'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email',
            [nome, email, hashedPassword]
        );

        return res.status(201).json(newUser.rows[0]);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Unexpected server error!" });
    }
};

const loginUser = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const userWithEmail = await pool.query(
            'SELECT * FROM usuarios WHERE email = $1',
            [email]
        );

        if (userWithEmail.rowCount < 1) {
            return res.status(404).json({ message: 'Invalid email or password' });
        }

        const validPassword = await bcrypt.compare(senha, userWithEmail.rows[0].senha);

        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: userWithEmail.rows[0].id }, jwtSecret, { expiresIn: '8h' });

        const { senha: _, ...loggedInUser } = userWithEmail.rows[0];

        return res.json({ user: loggedInUser, token });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Unexpected server error!" });
    }
};

const userProfile = async (req, res) => {
    try {
        const { id, nome, email } = req.usuario;
        const profile = { id, nome, email };
        return res.json(profile);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Unexpected server error!" });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.usuario;
        const { nome, email, senha } = req.body;
        const hashedPassword = await bcrypt.hash(senha, 10);

        const updatedUser = await pool.query(
            'UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4',
            [nome, email, hashedPassword, id]
        );

        return res.status(201).json(updatedUser.rows[0]);
    } catch (error) {
        return res.status(400).json({ message: "The provided email is already in use by another user." });
    }
};

module.exports = { registerUser, loginUser, userProfile, updateUser };