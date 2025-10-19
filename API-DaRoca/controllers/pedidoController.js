const { listarPedidos, inserirPedido } = require("../models/pedidoModel");

async function getPedidos(req, res) {
  try {
    const pedidos = await listarPedidos();
    res.json(pedidos);
  } catch (err) {
    res.status(500).send("Erro ao buscar pedidos: " + err.message);
  }
}

async function postPedido(req, res) {
  const { id_cliente, valor_total, status } = req.body;
  try {
    await inserirPedido(id_cliente, valor_total, status);
    res.status(201).send("Pedido criado com sucesso!");
  } catch (err) {
    res.status(500).send("Erro ao criar pedido: " + err.message);
  }
}

module.exports = { getPedidos, postPedido };
