require("dotenv").config();
const { pool } = require("../model/model.js");

const compiladorHTML = require("../model/compiladorHTML");
const transportador = require("../model/nodemailer");

const requests = async (req, res) => {
  const { cliente_id, pedido_produtos } = req.body;

  let valorTotal = 0;
  const pedido_produto = [];

  try {
    const clienteExiste = await pool.query("SELECT * FROM clientes WHERE id = $1", [parseInt(cliente_id)]);

    if (clienteExiste.rows.length === 0) {
      return res.status(400).json({ Mensagem: `Cliente com ID ${cliente_id} não encontrado.` });
    }

    let pedido = { cliente_id: parseInt(cliente_id) };

    if (req.body.observacao) {
      pedido.observacao = req.body.observacao;
    }

    for (const produto of pedido_produtos) {
      const { produto_id, quantidade_produto } = produto;

      if (!produto_id || !quantidade_produto || quantidade_produto <= 0) {
        return res.status(400).json({ Mensagem: "Campos obrigatórios para produtos não fornecidos ou inválidos." });
      }

      const produtoExiste = await pool.query("SELECT * FROM produtos WHERE id = $1", [produto_id]);

      if (produtoExiste.rows.length === 0) {
        return res.status(400).json({ Mensagem: `Produto com ID ${produto_id} não encontrado.` });
      }

      if (quantidade_produto > produtoExiste.rows[0].quantidade_estoque) {
        return res.status(400).json({ Mensagem: `Quantidade em estoque insuficiente para o produto com ID ${produto_id}.` });
      }

      const valorProduto = produtoExiste.rows[0].valor;
      const valorParcial = valorProduto * quantidade_produto;
      valorTotal += valorParcial;
    }

    pedido.valor_total = valorTotal;
    const novoPedido = await pool.query("INSERT INTO pedidos (cliente_id, observacao, valor_total) VALUES ($1, $2, $3) RETURNING *", [pedido.cliente_id, pedido.observacao, pedido.valor_total]);

    for (let i = 0; i < pedido_produtos.length; i++) {
      const produto = pedido_produtos[i];
      const produtoExiste = await pool.query("SELECT * FROM produtos WHERE id = $1", [produto.produto_id]);
      const pedido_produto_tabela = await pool.query("INSERT INTO pedido_produtos (pedido_id, produto_id, quantidade_produto, valor_produto) VALUES ($1, $2, $3, $4) RETURNING *", [
        novoPedido.rows[0].id,
        produtoExiste.rows[0].id,
        produto.quantidade_produto,
        produtoExiste.rows[0].valor,
      ]);
      pedido_produto.push(pedido_produto_tabela.rows[0]);
    }

    const registro = {
      novoPedido: novoPedido.rows,
      pedido_produto,
    };
    // odhw ktok hqvk zztf

    const email_html = await compiladorHTML("../model/Email.html", { nome: clienteExiste.rows[0].nome, id: novoPedido.rows[0].id });
    console.log(clienteExiste.rows[0].email);
    console.log(clienteExiste.rows[0].nome);
    transportador.sendMail({
      from: "API-PDV <usarmyunidademilsim@gmail.com>",
      to: `${clienteExiste.rows[0].nome} <${clienteExiste.rows[0].email} >`,
      subject: "Cadastro de pedido",
      html: email_html,
    });

    return res.status(201).json({ Mensagem: "Pedido criado com sucesso.", registro });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = {
  requests,
};
