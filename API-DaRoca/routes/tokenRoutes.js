// middleware/authMiddleware.js
const { verificarToken } = require("../services/auth");

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"

  if (!token) return res.status(401).json({ message: "Token não fornecido!" });

  const { valid, decoded, message } = verificarToken(token);

  if (!valid) return res.status(403).json({ message: "Token inválido: " + message });

  req.usuario = decoded; // armazena dados do usuário para a rota
  next();
}

module.exports = authMiddleware;