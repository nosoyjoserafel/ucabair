const express = require('express');
const router = express.Router();
const { getData, postData } = require('../controllers/userController');
const { getPruebas, agregarPrueba, modificarPrueba, eliminarPrueba } = require('../controllers/pruebasController');

router.get('/pruebas', getPruebas);

//router.get('/', getData);

router.post('/submit-user', postData);

module.exports = router;