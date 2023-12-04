const { pool } = require("../model/model.js");
require("dotenv").config();

const listProducts = async (req, res) => {
  const { categoria_id } = req.query;

  try {
    let products;

    if (categoria_id) {
      if (isNaN(categoria_id)) {
        return res.status(400).json({
          message: 'The parameter "categoria_id" must be a valid integer',
        });
      }

      const existingCategory = await pool.query("SELECT * FROM categorias WHERE id = $1", [categoria_id]);

      if (existingCategory.rows.length === 0) {
        return res.status(400).json({ message: "The provided category does not exist" });
      }

      products = await pool.query("SELECT * FROM produtos WHERE categoria_id = $1", [categoria_id]);
    } else {
      products = await pool.query("SELECT * FROM produtos");
    }

    res.status(200).json(products.rows);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = listProducts;
