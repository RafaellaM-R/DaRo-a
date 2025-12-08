const comentarioModel = require("../models/comentarioModel");


async function criarComentario(req, res) {
  try {
    const { comentario, email_cliente } = req.body;

    if (!comentario || !email_cliente) {
      return res.status(400).json({ erro: "Comentário e email são obrigatórios!" });
    }

    const novoComentario = {
      comentario_texto: comentario,
      email_cliente,
    };

    const resultado = await comentarioModel.inserirComentario(novoComentario);
    res.status(201).json(resultado);
  } catch (err) {
    console.error("Erro ao inserir comentário:", err);
    res.status(500).json({ erro: "Erro ao inserir comentário." });
  }
}


async function listarComentarios(req, res) {
  try {
    const comentarios = await comentarioModel.listarComentarios();
    res.json(comentarios);
  } catch (err) {
    console.error("Erro ao listar comentários:", err);
    res.status(500).json({ erro: "Erro ao listar comentários." });
  }
}

module.exports = { criarComentario, listarComentarios };
