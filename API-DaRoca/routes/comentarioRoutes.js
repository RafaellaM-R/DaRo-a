const express = require("express");
const router = express.Router();
const comentarioController = require("../controllers/comentarioController");

router.post("/", comentarioController.criarComentario);
router.get("/", comentarioController.listarComentarios);

module.exports = router;
