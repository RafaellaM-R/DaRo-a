const jwt = require("jsonwebtoken");

// Segredo para assinar o token (mantenha em .env no futuro)
const JWT_SECRET = "supersecreto123"; // troque por algo mais seguro

// Função para gerar o token
function gerarToken(usuario) {
  // O token pode conter dados do usuário, mas **não coloque senhas**
  const payload = {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email
  };

  // Gera token com validade de 1 hora
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  return token;
}

//  Função para verificar o token
function verificarToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { valid: true, decoded };
  } catch (err) {
    return { valid: false, message: err.message };
  }
}

module.exports = {
  gerarToken,
  verificarToken
};