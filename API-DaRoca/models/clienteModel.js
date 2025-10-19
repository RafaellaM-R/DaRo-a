const { sql, poolPromise } = require("../database/connection");

async function inserirCliente(nome, email, telefone) {
  const pool = await poolPromise;
  await pool.request()
    .input("nome", sql.VarChar(50), nome)
    .input("email", sql.VarChar(50), email)
    .input("telefone", sql.VarChar(20), telefone)
    .query("INSERT INTO daroca.clientes (nome, email, telefone) VALUES (@nome, @email, @telefone)");
}

module.exports = { inserirCliente };
