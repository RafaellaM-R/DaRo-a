const { sql, poolPromise } = require("../database/connection");

async function listarPedidos() {
  const pool = await poolPromise;
  const result = await pool.request().query("SELECT * FROM daroca.pedidos");
  return result.recordset;
}

async function inserirPedido(id_cliente, valor_total, status) {
  const pool = await poolPromise;
  await pool.request()
    .input("id_cliente", sql.Int, id_cliente)
    .input("valor_total", sql.Decimal(10, 2), valor_total)
    .input("status", sql.VarChar(50), status || "Pendente")
    .query(`
      INSERT INTO daroca.pedidos (id_cliente, valor_total, status)
      VALUES (@id_cliente, @valor_total, @status)
    `);
}

module.exports = { listarPedidos, inserirPedido };
