const { poolPromise } = require("../database/connection");

async function listarProdutos(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM daroca.produtos");
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar produtos: " + err.message);
  }
}

module.exports = { listarProdutos };
