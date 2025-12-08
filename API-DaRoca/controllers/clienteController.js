const Cliente = require("../models/ClienteModel");

async function login(req, res) {
  try {
    const { email, senha } = req.body;
    const resultado = await Cliente.login(email, senha);

    if (resultado.erro) {
      return res.status(401).json({ erro: resultado.erro });
    }

    const cliente = resultado.cliente;

    return res.status(200).json({
      mensagem: "Login realizado com sucesso!",
      token: resultado.token,
      cliente: {
        id_cliente: cliente.id_cliente,
        nome: cliente.nome,
        email: cliente.email
      }
    });

  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
}

async function inserir(req, res) {
  try {
    const resultado = await Cliente.inserir(req.body);

    if (resultado.erro) {
      return res.status(400).json({ msg: resultado.erro });
    }

    return res.status(201).json(resultado);

  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
}

module.exports = {
  login,
  inserir
};
