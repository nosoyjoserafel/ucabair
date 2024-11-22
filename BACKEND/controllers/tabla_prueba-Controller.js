const pool = require('../config/db');

// Obtener datos
const getData = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM public.tabla_prueba');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

// Crear datos
const createData = async (req, res, next) => {
  const { nombre } = req.body;
  try {
    const result = await pool.query('INSERT INTO public.tabla_prueba (nombre) VALUES ($1) RETURNING *', [nombre]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// Actualizar datos
const updateData = async (req, res, next) => {
  console.log(req.params);
  console.log(req.body);
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const result = await pool.query('UPDATE public.tabla_prueba SET nombre = $1 WHERE id = $2 RETURNING *', [nombre, id]);
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// Eliminar datos
const deleteData = async (req, res, next) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM public.tabla_prueba WHERE id = $1 RETURNING *', [id]);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = { getData, createData, updateData, deleteData };