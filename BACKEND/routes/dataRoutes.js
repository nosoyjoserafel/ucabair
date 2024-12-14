const express = require('express');
const router = express.Router();
const path = require('path');
const { getData, postData } = require('../controllers/userController');
const { getPruebas, agregarPrueba, modificarPrueba, eliminarPrueba } = require('../controllers/pruebasController');
const { getAviones, addAvion, updateAvion, deleteAvion } = require('../controllers/avionesController');
const { getUsuarios, addUsuario, loginUsuario } = require('../controllers/userController');

//rutas de pruebas

router.get('/pruebas', getPruebas);

router.post('/pruebas', agregarPrueba);

router.put('/pruebas/:codigo', modificarPrueba);

router.delete('/pruebas/:codigo', eliminarPrueba);

//rutas de aviones

router.get('/aviones-page', (req, res) => {
    res.sendFile(path.join(__dirname, '../../FRONTEND/public/views', 'gestion-avion.html'));
});

router.get('/aviones', getAviones);

router.post('/aviones', addAvion);

router.put('/aviones/:codigo', updateAvion);

router.delete('/aviones/:codigo', deleteAvion);

//router.get('/', getData);

router.post('/submit-user', postData);

//ruta para iniciar sesión y para registrarse

router.post('/login', loginUsuario);

router.get('/logout', (req, res) => {
    res.json({ message: 'success' });
});

router.get('/singup-page', (req, res) => {
    res.sendFile(path.join(__dirname, '../../FRONTEND/public/views', 'singup.html'));
});

router.get('/register', getUsuarios);

router.post('/register', addUsuario);

//ruta para la página de inicio
router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../../FRONTEND/public/views', 'home.html'));
});

module.exports = router;