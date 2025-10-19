const express = require("express");
const { listarProdutos } = require("../controllers/produtoController");

const router = express.Router();
router.get("/", listarProdutos);

module.exports = router;
