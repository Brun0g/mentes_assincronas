const { pool } = require("../model/model.js");

const categoryValidation = async (req, res, next) => {
    const { categoria_id } = req.body;
    console.log("Request Body:", req.body);

    if (!categoria_id) {
        return res.status(400).json({ message: "Category ID not provided!" });
    }

    try {
        const result = await pool.query("SELECT id FROM categorias");
        const categoryIds = result.rows.map((categoria) => categoria.id);

        const isValidCategoryId = categoryIds.includes(categoria_id);

        if (!isValidCategoryId) {
            return res.status(400).json({ message: "Invalid category ID!" });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = categoryValidation;