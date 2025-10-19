const express = require("express");
const cors = require("cors");

// Importa todas as rotas
const clienteRoutes = require("./routes/clienteRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");
const produtoRoutes = require("./routes/produtoRoutes");
const comentarioRoutes = require("./routes/comentarioRoutes");
const pedidoRoutes = require("./routes/pedidoRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/clientes", clienteRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/produtos", produtoRoutes);
app.use("/comentarios", comentarioRoutes);
app.use("/pedidos", pedidoRoutes);
app.use("/auth", authRoutes);

module.exports = app;