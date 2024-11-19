const { Client } = require('pg');

const client = new Client({
  user: 'grupo_rsm',
  host: 'labs-dbservices01.ucab.edu.ve',
  database: 'grupo_rsm',
  password: '123456',
  port: 5432,
});

client.connect()
  .then(() => console.log('Conectado a la base de datos'))
  .catch(err => console.error('Error de conexión', err.stack));