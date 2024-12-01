const express = require('express');
const router = express.Router();
const { getData, postData } = require('../controllers/userController');
const { getPruebas, agregarPrueba, modificarPrueba, eliminarPrueba } = require('../controllers/pruebasController');

router.get('/pruebas', getPruebas);

router.post('/pruebas', agregarPrueba);

router.put('/pruebas/:codigo', modificarPrueba);

router.delete('/pruebas/:codigo', eliminarPrueba);

//router.get('/', getData);

router.post('/submit-user', postData);

module.exports = router;