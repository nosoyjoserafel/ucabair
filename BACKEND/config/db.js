const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres', // El usuario de la base de datos
  host: process.env.DB_HOST || 'localhost', // La dirección de la base de datos
  database: process.env.DB_NAME || 'db_prueba', // El nombre de la base de datos
  password: process.env.DB_PASSWORD || '12345',   // La contraseña del usuario
  port: process.env.DB_PORT || 5432, // El puerto de la base de datos
});

module.exports = pool;