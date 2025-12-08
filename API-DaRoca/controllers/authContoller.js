const mssql = require("mssql");
const bcrypt = require("bcrypt");
const { gerarToken } = require("../services/auth");
require("dotenv").config();

const connectionString = process.env.CONNECTION_STRING;


exports.login = async (req, res) => {
  const { email, senha } = req.body;
  let conexao;

  try {
    conexao = await mssql.connect(connectionString);

    const result = await conexao.request()
      .input("email", mssql.VarChar, email)
      .query("SELECT * FROM cliente WHERE email = @email");

    const usuario = result.recordset[0];

    if (!usuario) {
      return res.status(404).json({ message: "Cliente não encontrado!" });
    }

    // Compara senha criptografada
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ message: "Senha incorreta!" });
    }

    const token = gerarToken(usuario);
    res.status(200).json({
      message: "Login realizado com sucesso!",
      token,
      cliente: {
        id: usuario.id_cliente,
        nome: usuario.nome,
        email: usuario.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Erro ao realizar login: " + err.message });
  } finally {
    if (conexao) await conexao.close();
  }
};

// === CADASTRO (INSERIR CLIENTE) ===
exports.inserir = async (req, res) => {
  const { nome, email, telefone, endereco, senha, role } = req.body;
  let conexao;

  try {
    conexao = await mssql.connect(connectionString);

    // Verifica se o email já existe
    const verifica = await conexao.request()
      .input("email", mssql.VarChar, email)
      .query("SELECT id_cliente FROM cliente WHERE email = @email");

    if (verifica.recordset.length > 0) {
      return res.status(400).json({ message: "Email já cadastrado!" });
    }

    // Criptografa senha
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // Insere cliente
    await conexao.request()
      .input("nome", mssql.VarChar, nome)
      .input("email", mssql.VarChar, email)
      .input("telefone", mssql.VarChar, telefone || null)
      .input("endereco", mssql.VarChar, endereco || null)
      .input("data_cadastro", mssql.Date, new Date())
      .input("senha", mssql.VarChar, senhaCriptografada)
      .input("role", mssql.VarChar, role || null)
      .query(`
        INSERT INTO cliente (nome, email, telefone, endereco, data_cadastro, senha, role)
        VALUES (@nome, @email, @telefone, @endereco, @data_cadastro, @senha, @role)
      `);

    res.status(201).json({ message: "Cliente cadastrado com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao cadastrar cliente: " + err.message });
  } finally {
    if (conexao) await conexao.close();
  }
};
