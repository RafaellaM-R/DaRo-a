const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get("/dados", authMiddleware, (req, res) => {
  res.json({ message: `Bem-vindo, ${req.usuario.email}!` });
});