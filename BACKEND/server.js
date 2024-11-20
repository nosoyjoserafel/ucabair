const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./config/db');
const dataRoutes = require('./routes/dataRoutes');
const errorHandler = require('./middlewares/errorHandler');

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/data', dataRoutes);

// Middleware para manejar errores
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});