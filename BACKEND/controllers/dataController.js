const pool = require('../config/db');

const getData = async (req, res, next) => {
  try {
    console.log('Ejecutando consulta a la base de datos...');
    const result = await pool.query('SELECT * FROM public.tabla_prueba');
    console.log('Consulta exitosa:', result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error('Error en la consulta:', err);
    next(err);
  }
};

const postData = async (req, res, next) => {
  try {
    const { nombre, apellido } = req.body;
    console.log('Ejecutando inserción en la base de datos...');
    const result = await pool.query('SELECT * FROM usuarios');
    //const result = await pool.query('INSERT INTO usuarios (nombre, apellido) VALUES ($1, $2) RETURNING *', [nombre, apellido]);
    console.log('Inserción exitosa:', result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error('Error en la inserción:', err);
    next(err);
  }
};

module.exports = { getData, postData };