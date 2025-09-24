
require("dotenv").config();
const express = require("express");
const sql = require("mssql");
const cors = require("cors");


const app = express();
const PORT = process.env.PORTA || 3000; // usa a porta do .env ou 3000
const stringSQL = process.env.CONNECTION_STRING;

// Middleware
app.use(cors({ origin: "http://localhost" }));
app.use(express.json());


const poolPromise = new sql.ConnectionPool(stringSQL)
    .connect()
    .then(pool => {
        console.log(" BD conectado com sucesso.");
        return pool;
    })
    .catch(err => {
        console.error(" Erro ao conectar ao BD:", err);
        process.exit(1);
    });



// Buscar produtos
app.get("/produtos", async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query("SELECT * FROM daroca.produtos");
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao buscar produtos: " + err.message);
    }
});

// Buscar categorias
app.get("/categorias", async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query("SELECT * FROM daroca.categorias");
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao buscar categorias: " + err.message);
    }
});

// Cadastrar cliente
app.post("/clientes", async (req, res) => {
    const { nome, email, telefone } = req.body;
    try {
        const pool = await poolPromise;
        await pool.request()
            .input("nome", sql.VarChar(50), nome)
            .input("email", sql.VarChar(50), email)
            .input("telefone", sql.VarChar(20), telefone)
            .query("INSERT INTO daroca.clientes (nome, email, telefone) VALUES (@nome, @email, @telefone)");

        res.status(201).send("Cliente cadastrado com sucesso!");
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao cadastrar cliente: " + err.message);
    }
});


app.listen(PORT, () => {
    console.log(`🚀 API rodando em http://localhost:${PORT}`);
});
