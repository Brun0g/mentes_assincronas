require("dotenv").config();
const { pool } = require("../model/model.js");
const { excluirArquivo } = require('../middleware/storage');

const productDelete = async (req, res) => {
    const { id } = req.params;

    try {
        const idProduct = await pool.query("select count(id) from produtos where id = $1", [id]);

        if (idProduct.rows[0].count === "0") {
            return res.status(400).json({ message: "Product not found!" });
        }

        const { produto_imagem } = (await pool.query("select produto_imagem from produtos where id = $1", [id])).rows[0];

        if (produto_imagem) {
            await excluirArquivo(produto_imagem);
        }
        const result = await pool.query("delete from produtos where id = $1 returning *", [id]);

        const deletedProduct = result.rows[0];

        return res.status(200).json();
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error product delete" });
    }
};

module.exports = productDelete;
