const produtoModel = require("../models/Produto");

async function listarProdutos(req, res) {
  try {
    const produtos = await produtoModel.listarProdutos();
    res.json(produtos);
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    res.status(500).send("Erro ao buscar produtos: " + err.message);
  }
}

module.exports = { listarProdutos };
