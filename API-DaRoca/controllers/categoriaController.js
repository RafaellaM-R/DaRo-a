const sql = require("mssql");

async function listarCategorias(req, res) {
  try {
    
    const result = await sql.query("SELECT * FROM daroca.categorias");
    res.json(result.recordset);
  } catch (err) {
    console.error("Erro ao buscar categorias:", err);
    res.status(500).send("Erro ao buscar categorias: " + err.message);
  }
}

module.exports = { listarCategorias };
