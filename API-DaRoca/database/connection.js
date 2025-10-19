const sql = require("mssql");

const config = {
  user: "BD25570",
  password: "BD25570",
  server: "localhost",
  database: "daroca",
  options: {
    encrypt: false, // se estiver no localhost
  },
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("✅ Conectado ao SQL Server");
    return pool;
  })
  .catch(err => console.error("❌ Erro na conexão com o banco:", err));

module.exports = { sql, poolPromise };
