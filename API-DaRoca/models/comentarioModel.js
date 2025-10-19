const { sql, poolPromise } = require("../database/connection");

async function listarComentarios() {
  const pool = await poolPromise;
  const result = await pool.request().query("SELECT * FROM daroca.comentarios");
  return result.recordset;
}

async function inserirComentario(id_cliente, comentario) {
  const pool = await poolPromise;
  await pool.request()
    .input("id_cliente", sql.Int, id_cliente)
    .input("comentario", sql.VarChar(sql.MAX), comentario)
    .query("INSERT INTO daroca.comentarios (id_cliente, comentario) VALUES (@id_cliente, @comentario)");
}

module.exports = { listarComentarios, inserirComentario };
