const { conectaBD } = require("../config/db");

async function inserirComentario({ comentario_texto, email_cliente }) {
  const conexao = await conectaBD();

  await conexao.query(`
    INSERT INTO daroca.COMENTARIOS (comentario, data_comentario, email_cliente)
    VALUES ('${comentario_texto}', GETDATE(), '${email_cliente}')
  `);

  await conexao.close();
  return { mensagem: "Comentário inserido com sucesso!" };
}


async function listarComentarios() {
  const conexao = await conectaBD();

 
  const result = await conexao.query(`
    SELECT id_comentario, comentario, data_comentario, email_cliente
    FROM daroca.COMENTARIOS
    ORDER BY data_comentario DESC
  `);

  await conexao.close();
  return result.recordset;
}

module.exports = { inserirComentario, listarComentarios };
