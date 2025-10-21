require("dotenv").config(); // Carrega variáveis do .env
const express = require("express");
const cors = require("cors");

// Importa as rotas
const clienteRoutes = require("./routes/clienteRoutes");
const loginRoutes = require("./routes/loginRoutes");
const perfilRoutes = require("./routes/perfilRoutes");
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/clientes", clienteRoutes);
app.use("/auth", loginRoutes);
app.use("/auth", loginRoutes);
app.use("/perfil", perfilRoutes);

// Porta definida no .env ou 3000 por padrão
const PORT = process.env.PORT || 3000;

// Inicia o servidor
app.listen(PORT, () => {
  console.log(` Servidor rodando em http://localhost:${PORT}`);
});
