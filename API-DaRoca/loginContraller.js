const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Usuários de exemplo com senha hash
const usuarios = [
  { 
    id: 1, 
    email: "rafa@exemplo.com", 
    senha: bcrypt.hashSync("123456", 8), // senha criptografada
    nome: "Rafa" 
  }
];

const login = (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ sucesso: false, mensagem: "Email e senha são obrigatórios!" });
  }

  const usuario = usuarios.find(u => u.email === email);
  if (!usuario) {
    return res.status(401).json({ sucesso: false, mensagem: "Email ou senha incorretos!" });
  }

  // Verifica senha
  const senhaValida = bcrypt.compareSync(senha, usuario.senha);
  if (!senhaValida) {
    return res.status(401).json({ sucesso: false, mensagem: "Email ou senha incorretos!" });
  }

  // Gera token JWT (expira em 1 hora)
  const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    process.env.JWT_SECRET || "segredo123",
    { expiresIn: "1h" }
  );

  return res.json({
    sucesso: true,
    mensagem: "Login bem-sucedido!",
    usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
    token
  });
};

module.exports = { login };
