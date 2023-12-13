require("dotenv").config();
const { pool } = require("../model/model.js");

const compiladorHTML = require("../model/compiladorHTML");
const transportador = require("../model/nodemailer");

const requests = async (req, res) => {
  const { cliente_id, pedido_produtos } = req.body;

  let totalValue = 0;
  const orderProducts = [];

  try {
    const clientExists = await pool.query("SELECT * FROM clientes WHERE id = $1", [parseInt(cliente_id)]);

    if (clientExists.rows.length === 0) {
      return res.status(400).json({ Mensagem: `Client with ID ${client_id} not found.` });
    }

    let order = { cliente_id: parseInt(cliente_id) };

    if (req.body.observacao) {
      order.observacao = req.body.observacao;
    }

    for (const produto of pedido_produtos) {
      const { produto_id, quantidade_produto } = produto;

      if (!produto_id || !quantidade_produto || quantidade_produto <= 0) {
        return res.status(400).json({ Mensagem: "Required fields for products not provided or invalid." });
      }

      const productExists = await pool.query("SELECT * FROM produtos WHERE id = $1", [produto_id]);

      if (productExists.rows.length === 0) {
        return res.status(400).json({ Mensagem: `Product with ID ${product_id} not found.` });
      }

      if (quantidade_produto > productExists.rows[0].quantidade_estoque) {
        return res.status(400).json({ Mensagem: `Insufficient stock quantity for the product with ID ${product_id}.` });
      }

      const productValue = productExists.rows[0].valor;
      const partialValue = productValue * quantidade_produto;
      totalValue += partialValue;
    }

    order.valor_total = totalValue;
    const newOrder = await pool.query("INSERT INTO pedidos (cliente_id, observacao, valor_total) VALUES ($1, $2, $3) RETURNING *", [order.cliente_id, order.observacao, order.valor_total]);

    for (let i = 0; i < pedido_produtos.length; i++) {
      const produto = pedido_produtos[i];
      const productExists = await pool.query("SELECT * FROM produtos WHERE id = $1", [produto.produto_id]);
      const pedido_produto_tabela = await pool.query("INSERT INTO pedido_produtos (pedido_id, produto_id, quantidade_produto, valor_produto) VALUES ($1, $2, $3, $4) RETURNING *", [
        newOrder.rows[0].id,
        productExists.rows[0].id,
        produto.quantidade_produto,
        productExists.rows[0].valor,
      ]);
      orderProducts.push(pedido_produto_tabela.rows[0]);
    }

    const record = {
      newOrder: newOrder.rows,
      orderProducts,
    };

    const email_html = await compiladorHTML("./src/Email.html", { nome: clientExists.rows[0].nome, id: newOrder.rows[0].id });
    transportador.sendMail({
      from: "API-PDV <usarmyunidademilsim@gmail.com>",
      to: `${clientExists.rows[0].nome} <${clientExists.rows[0].email}>`,
      subject: "Order registration",
      html: email_html,
    });

    return res.status(201).json({ Mensagem: "Order created successfully.", record });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = requests;
