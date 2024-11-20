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

module.exports = { getData };