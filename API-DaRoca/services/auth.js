const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.SECRET;


function gerarToken(usuario) {
  return jwt.sign(
    {
      id: usuario.id_cliente,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role,
    },
    SECRET,
    { expiresIn: "1h" } 
  );
}


function autenticar(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ msg: "Token não fornecido" });

  const header = authHeader.split(" ");
  const token = header[1];
  if (!token)
    return res.status(401).json({ msg: "Token não fornecido" });

  jwt.verify(token, SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ msg: "Token inválido ou expirado" });
    req.user = user;
    next();
  });
}

module.exports = { gerarToken, autenticar };
