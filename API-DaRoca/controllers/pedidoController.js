const Pedido = require("../models/PedidoModel");


async function inserir(req, res) {
  try {
    const { valor_total, status, frequencia, frete, itens } = req.body;

    const id_cliente = req.user?.id_cliente || req.body.id_cliente;

    if (!id_cliente) {
      return res.status(401).json({ erro: "Cliente não logado." });
    }

    if (!valor_total) {
      return res.status(400).json({ erro: "Valor total é obrigatório." });
    }

    if (!frequencia) {
      return res.status(400).json({ erro: "Frequência de entrega é obrigatória." });
    }

    if (!Array.isArray(itens) || itens.length === 0) {
      return res.status(400).json({ erro: "Nenhum item no pedido." });
    }

    const idPedido = await Pedido.inserir({
      id_cliente,
      valor_total,
      status: status || "Pendente",
      frequencia,
      frete: frete || 0,
      itens
    });

    return res.status(201).json({
      mensagem: "Pedido criado com sucesso!",
      idPedido
    });

  } catch (err) {
    console.error("Erro ao inserir pedido:", err);
    return res.status(500).json({ erro: err.message });
  }
}



async function buscarPorCliente(req, res) {
  try {
    const idCliente = req.params.id;

    const pedidos = await Pedido.buscarPorCliente(idCliente);

    return res.json(pedidos);

  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    return res.status(500).json({ erro: "Erro ao buscar pedidos." });
  }
}

module.exports = { inserir, buscarPorCliente };
