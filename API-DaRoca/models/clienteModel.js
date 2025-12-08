const { conectaBD } = require("../config/db");
const bcrypt = require("bcrypt");
const { gerarToken } = require("../services/auth");

// ======================= LOGIN =======================
async function login(email, senha) {
  const conexao = await conectaBD();

  const result = await conexao
    .request()
    .input("email", email)
    .query(`
      SELECT id_cliente, nome, email, senha 
      FROM daroca.CLIENTES 
      WHERE email = @email
    `);

  const usuario = result.recordset[0];

  if (!usuario) {
    await conexao.close();
    return { erro: "Cliente não encontrado" };
  }

  const senhaOK = await bcrypt.compare(senha, usuario.senha);
  if (!senhaOK) {
    await conexao.close();
    return { erro: "Senha incorreta" };
  }

  const token = gerarToken(usuario);

  await conexao.close();
  return {
    mensagem: "Login realizado com sucesso!",
    token,
    cliente: {
      id_cliente: usuario.id_cliente, 
      nome: usuario.nome,
      email: usuario.email
    }
  };
}


async function inserir(cliente) {
  const { nome, email, telefone, endereco, senha, role } = cliente;
  const conexao = await conectaBD();

  // Verifica se já existe
  const existe = await conexao
    .request()
    .input("email", email)
    .query(`
      SELECT id_cliente FROM daroca.CLIENTES WHERE email = @email
    `);

  if (existe.recordset.length > 0) {
    await conexao.close();
    return { erro: "Email já cadastrado" };
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  await conexao
    .request()
    .input("nome", nome)
    .input("email", email)
    .input("telefone", telefone || "")
    .input("endereco", endereco || "")
    .input("senha", senhaHash)
    .input("role", role || "")
    .query(`
      INSERT INTO daroca.CLIENTES 
      (nome, email, telefone, endereco, data_cadastro, senha, role)
      VALUES (@nome, @email, @telefone, @endereco, GETDATE(), @senha, @role)
    `);

  await conexao.close();
  return { mensagem: "Cliente cadastrado com sucesso!" };
}

module.exports = { login, inserir };
