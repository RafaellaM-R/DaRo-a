const { conectaBD, sql } = require("../config/db");

async function listarProdutos() {
  let connection;

  try {
    connection = await conectaBD();
    const result = await connection.request().query("SELECT * FROM daroca.PRODUTOS");
    return result.recordset;
  } finally {
    if (connection) await connection.close();
  }
}

module.exports = { listarProdutos };
