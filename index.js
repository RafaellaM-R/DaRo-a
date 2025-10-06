require("dotenv").config();
const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
const PORT = process.env.PORTA || 3000; // porta do .env ou 3000
const stringSQL = process.env.CONNECTION_STRING;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/imagem_produto", express.static("imagem_produto"));

// Função para conectar ao banco 
async function conectarBD() {
    try {
        const conexao = await sql.connect(stringSQL);
        return conexao;
    } catch (err) {
        console.error("Erro ao conectar ao BD:", err);
        throw err;
    }
}

// Buscar produtos
app.get("/produtos", async (req, res) => {
    try {
        const conexao = await conectarBD();
        const result = await conexao.request().query("SELECT * FROM daroca.produtos");
        res.json(result.recordset);
        sql.close(); // fecha a conexão
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao buscar produtos: " + err.message);
    }
});

// Buscar categorias
app.get("/categoria", async (req, res) => {
    try {
        const conexao = await conectarBD();
        const result = await conexao.request().query("SELECT * FROM daroca.categorias");
        res.json(result.recordset);
        sql.close();
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao buscar categorias: " + err.message);
    }
});

// Cadastrar cliente
app.post("/clientes", async (req, res) => {
    const { nome, email, telefone } = req.body;
    try {
        const conexao = await conectarBD();
        await conexao.request()
            .input("nome", sql.VarChar(50), nome)
            .input("email", sql.VarChar(50), email)
            .input("telefone", sql.VarChar(20), telefone)
            .query("INSERT INTO daroca.clientes (nome, email, telefone) VALUES (@nome, @email, @telefone)");
        
        res.status(201).send("Cliente cadastrado com sucesso!");
        sql.close();
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao cadastrar cliente: " + err.message);
    }
});




app.listen(PORT, () => {
    console.log(`🚀 API rodando em http://localhost:${PORT}`);
});
