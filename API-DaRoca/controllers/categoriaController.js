const { poolPromise } = require("../database/connection");

async function listarCategorias(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM daroca.categorias");
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar categorias: " + err.message);
  }
}

module.exports = { listarCategorias };
