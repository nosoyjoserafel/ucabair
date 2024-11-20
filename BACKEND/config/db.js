const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'grupo_rsm',
  host: process.env.DB_HOST || 'labs-dbservices01.ucab.edu.ve',
  database: process.env.DB_NAME || 'grupo_rsm',
  password: process.env.DB_PASSWORD || '123456',
  port: process.env.DB_PORT || 5432,
});

module.exports = pool;