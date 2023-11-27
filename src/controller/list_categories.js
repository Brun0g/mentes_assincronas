const { pool } = require("../model/model.js");
require("dotenv").config();

const listCategory = async (req, res) => {
  try {
    const resolution = await pool.query("SELECT * FROM categorias");
    res.json(resolution.rows);
  } catch (err) {
    return res.status(500).send("Error while retrieving categories.");
  }
};

module.exports = listCategory;
