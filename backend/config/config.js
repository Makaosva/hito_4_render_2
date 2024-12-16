// PARA LA BASE DE DATOS funcione en el pc backend
require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.PGHOST || "localhost",
  user: process.env.PGUSER || "postgres",
  password: process.env.PGPASSWORD || "sql7777",
  database: process.env.PGDATABASE || "market",
  port: process.env.PGPORT || 5432,
  allowExitOnIdle: true,
});

module.exports =  pool ;
