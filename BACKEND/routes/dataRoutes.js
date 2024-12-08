const express = require('express');
const router = express.Router();
const { getData, postData } = require('../controllers/userController');
const { getPruebas, agregarPrueba, modificarPrueba, eliminarPrueba } = require('../controllers/pruebasController');
const { getAviones, addAvion, updateAvion, deleteAvion } = require('../controllers/avionesController');

//rutas de pruebas

router.get('/pruebas', getPruebas);

router.post('/pruebas', agregarPrueba);

router.put('/pruebas/:codigo', modificarPrueba);

router.delete('/pruebas/:codigo', eliminarPrueba);

//rutas de aviones

router.get('/aviones', getAviones);

router.post('/aviones', addAvion);

router.put('/aviones/:codigo', updateAvion);

router.delete('/aviones/:codigo', deleteAvion);

//router.get('/', getData);

router.post('/submit-user', postData);

module.exports = router;