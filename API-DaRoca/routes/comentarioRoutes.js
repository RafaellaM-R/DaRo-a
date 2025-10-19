const express = require("express");
const { getComentarios, postComentario } = require("../controllers/comentarioController");

const router = express.Router();

router.get("/", getComentarios);
router.post("/", postComentario);

module.exports = router;
