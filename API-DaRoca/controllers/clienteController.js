const { inserirCliente } = require("../models/clienteModel");

async function cadastrarCliente(req, res) {
  const { nome, email, telefone } = req.body;
  try {
    await inserirCliente(nome, email, telefone);
    res.status(201).send("Cliente cadastrado com sucesso!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao cadastrar cliente: " + err.message);
  }
}

module.exports = { cadastrarCliente };
