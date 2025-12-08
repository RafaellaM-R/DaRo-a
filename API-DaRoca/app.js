console.log("🔥 Iniciando servidor...");

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const clienteRoutes = require("./routes/clienteRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");
const produtoRoutes = require("./routes/produtoRoutes");
const comentarioRoutes = require("./routes/comentarioRoutes");
const pedidoRoutes = require("./routes/pedidoRoutes");



const app = express();

app.use(cors());
app.use(express.json());

app.use("/clientes", clienteRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/produtos", produtoRoutes);
app.use("/comentarios", comentarioRoutes);

app.use("/pedidos", pedidoRoutes);



module.exports = app;

