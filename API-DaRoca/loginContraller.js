// controllers/loginController.js
const jwt = require("jsonwebtoken");
const { sql, poolPromise } = require("../database/connection");
const SECRET = "DaRocaSegredoSuperSeguro"; // depois guarda isso num .env

async function login(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha)
    return res.status(400).json({ message: "Preencha e-mail e senha!" });

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("email", sql.VarChar(50), email)
      .query("SELECT * FROM daroca.clientes WHERE email = @email");

    const usuario = result.recordset[0];
    if (!usuario)
      return res.status(401).json({ message: "Usuário não encontrado!" });

    
    if (usuario.senha !== senha)
      return res.status(401).json({ message: "Senha incorreta!" });

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      SECRET,
      { expiresIn: "2h" }
    );

    res.json({ message: "Login realizado!", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro no login: " + err.message });
  }
}

module.exports = { login };