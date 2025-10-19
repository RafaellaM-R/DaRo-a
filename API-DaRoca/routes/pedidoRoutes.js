const express = require("express");
const { getPedidos, postPedido } = require("../controllers/pedidoController");

const router = express.Router();

router.get("/", getPedidos);
router.post("/", postPedido);

module.exports = router;
