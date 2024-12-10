const express = require('express');
const cors = require('cors'); // Importar el paquete cors
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const dataRoutes = require('./routes/dataRoutes');
const errorHandler = require('./middlewares/errorHandler');

// Middleware para habilitar CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

app.use(express.urlencoded({ extended: true })); // Middleware para parsear datos URL-encoded

// Configurar la ruta para servir archivos estáticos
app.use(express.static(path.join(__dirname, '../FRONTEND/public')));

// Rutas
app.use('/', dataRoutes);

// Middleware para manejar errores
app.use(errorHandler);

// Ruta para servir el formulario, mientras depuramos estoy trabajando con pruebas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../FRONTEND/public/views', 'login.html'));
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});