const { poolPromise, sql } = require("../config/db");
const { gerarToken } = require("../services/auth");

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("email", sql.VarChar, email)
      .query("SELECT * FROM usuarios WHERE email = @email");

    const usuario = result.recordset[0];

    if (!usuario) return res.status(404).json({ message: "Usuário não encontrado!" });
    if (usuario.senha !== senha) return res.status(401).json({ message: "Senha incorreta!" });

    // Gera token
    const token = gerarToken(usuario);

    res.status(200).json({ message: "Login realizado com sucesso!", token });
  } catch (err) {
    res.status(500).json({ message: "Erro ao realizar login: " + err.message });
  }
};
