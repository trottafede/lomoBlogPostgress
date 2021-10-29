const { Client } = require("pg");

module.exports = async function customQuery(query) {
  // Conectarse a la BD.
  const client = new Client({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });
  await client.connect();

  // Ejecutar la Query.
  const result = await client.query(query);
  // Desconectarse de la BD.
  await client.end();

  // Retornar el resultado.
  return result;
};
