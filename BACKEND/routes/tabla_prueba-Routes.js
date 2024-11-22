const express = require('express');
const router = express.Router();

const { getData, createData, updateData, deleteData } = require('../controllers/tabla_prueba-Controller');

router.get('/', getData); // Obtener datos
router.post('/', createData); // Crear datos
router.put('/:id', updateData); // Actualizar datos
router.delete('/:id', deleteData); // Eliminar datos

// const { getData } = require('../controllers/tabla_prueba-Controller');

// router.get('/', getData);

module.exports = router;