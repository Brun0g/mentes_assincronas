const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "123456",
  database: "pdv",
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
