const { listarComentarios, inserirComentario } = require("../models/comentarioModel");

async function getComentarios(req, res) {
  try {
    const comentarios = await listarComentarios();
    res.json(comentarios);
  } catch (err) {
    res.status(500).send("Erro ao buscar comentários: " + err.message);
  }
}

async function postComentario(req, res) {
  const { id_cliente, comentario } = req.body;
  try {
    await inserirComentario(id_cliente, comentario);
    res.status(201).send("Comentário adicionado com sucesso!");
  } catch (err) {
    res.status(500).send("Erro ao adicionar comentário: " + err.message);
  }
}

module.exports = { getComentarios, postComentario };
