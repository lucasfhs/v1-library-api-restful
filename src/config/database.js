require("dotenv").config();
const { Client } = require("pg");

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false, // Se DB_SSL for "true", ativa SSL
});

async function runConnection() {
  try {
    await client.connect();
    console.log("The database connection was successful.");
  } catch (error) {
    console.error("Unable to connect to database:", error);
  }
}

runConnection();

module.exports = client;
