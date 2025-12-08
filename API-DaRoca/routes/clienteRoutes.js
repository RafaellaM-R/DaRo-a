const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");



router.post("/login", clienteController.login);
router.post("/cadastro", clienteController.inserir);



module.exports = router;

