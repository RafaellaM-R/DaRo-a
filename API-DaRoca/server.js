require("dotenv").config();
const app = require("./app");
const { conectaBD } = require("./config/db");

conectaBD()
  .then(() => {
    const PORT = process.env.PORT || 8081;
    app.listen(PORT, () => {
      console.log(` Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" Erro ao conectar ao banco:", err);
  });
