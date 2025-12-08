const mssql = require("mssql");
require("dotenv").config();

const connectionString = process.env.STRING_BD;

async function conectaBD() {
  return await mssql.connect(connectionString);
}

module.exports = { conectaBD };
