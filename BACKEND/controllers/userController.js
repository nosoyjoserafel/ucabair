const pool = require('../config/db');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const filePath = path.join(__dirname, '../usuarios.json');

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
    const result = await pool.query('INSERT INTO usuario (nombre, apellido) VALUES ($1, $2) RETURNING *', [nombre, apellido]);
    console.log('Inserción exitosa:', result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error('Error en la inserción:', err);
    next(err);
  }
};

const getUsuarios = (req, res) => {
  try {
      const data = fs.readFileSync(filePath, 'utf8');
      res.json(JSON.parse(data));
  } catch (error) {
      res.status(500).json({ error: 'Error al leer el archivo de usuarios' });
  }
};

const addUsuario = (req, res) => {
  try {
      const usuarios = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const { username, email, password, role } = req.body;

      // Verificar si el usuario o correo ya existe
      const usuarioExistente = usuarios.find(u => u.username === username || u.email === email);
      if (usuarioExistente) {
          return res.status(400).json({ error: 'El nombre de usuario o correo ya existe' });
      }

      const nuevoUsuario = {
          id: usuarios.length + 1,
          username,
          email,
          password: bcrypt.hashSync(password, 8),
          role
      };
      usuarios.push(nuevoUsuario);
      fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2), 'utf8');
      res.status(201).json(nuevoUsuario);
  } catch (error) {
      res.status(500).json({ error: 'Error al escribir en el archivo de usuarios' });
  }
};

module.exports = { getData, postData, getUsuarios, addUsuario };