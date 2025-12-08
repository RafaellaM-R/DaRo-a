const { conectaBD } = require("../config/db");



async function inserir({ id_cliente, valor_total, status, frequencia, frete, itens }) {
  const conexao = await conectaBD();

  try {
    
    const pedidoResult = await conexao.query(`
      INSERT INTO daroca.pedidos (id_cliente, valor_total, status, frequencia, frete)
      OUTPUT INSERTED.id_pedido
      VALUES (${id_cliente}, ${valor_total}, '${status}', '${frequencia}', ${frete})
    `);

    const id_pedido = pedidoResult.recordset[0].id_pedido;

   
    for (const item of itens) {
      await conexao.query(`
        INSERT INTO daroca.PEDIDOS_ITENS (id_pedido, id_produto, quantidade)
        VALUES (${id_pedido}, ${item.id_produto}, ${item.quantidade})
      `);
    }

    return id_pedido;

  } finally {
    await conexao.close();
  }
}


async function buscarPorCliente(idCliente) {
  const conexao = await conectaBD();

  const sql = `
    SELECT 
        p.id_pedido,
        p.data_pedido,
        p.valor_total,
        p.status,

        i.id_produto,
        i.quantidade,

        pr.nome AS nome_produto,
        pr.valor AS preco_produto,
        pr.imagem AS imagem

    FROM daroca.pedidos p
    JOIN daroca.PEDIDOS_ITENS i ON i.id_pedido = p.id_pedido
    JOIN daroca.produtos pr ON pr.id = i.id_produto
    WHERE p.id_cliente = ${idCliente}
    ORDER BY p.id_pedido DESC
  `;

  try {
    const result = await conexao.query(sql);
    return result.recordset;
  } catch (err) {
    console.error(" erro no sql:", err);
    throw new Error("Erro ao buscar pedidos do cliente.");
  } finally {
    await conexao.close();
  }
}

module.exports = { inserir, buscarPorCliente };
