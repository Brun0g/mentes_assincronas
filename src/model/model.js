const { Pool } = require("pg");

require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Erro na conexão:", err);
  } else {
    console.log("Conexão bem-sucedida. Hora atual do banco de dados:", res.rows[0].now);
  }
});

module.exports = {
  pool,
};
