const express = require("express");
const pedidoController = require("../controllers/pedidoController");

const router = express.Router();


router.post("/", pedidoController.inserir);


router.get("/cliente/:id", pedidoController.buscarPorCliente);

module.exports = router;
