const { pool } = require("../model/model.js");

const categoryValidation = async (req, res, next) => {
    const { categoria_id } = req.body;

    if (!categoria_id) {
        return res.status(400).json({ message: "Category ID not provided!" });
    }

    try {
        const result = await pool.query("select id from categorias where id = $1", [categoria_id]);

        if (result.rows.length === 0) {
            return res.status(400).json({ message: "Invalid category ID!" });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: "Error category validation" });
    }
};

module.exports = categoryValidation;