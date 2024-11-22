const express = require('express');
const cors = require('cors'); // Importar el paquete cors
const app = express();
const port = process.env.PORT || 3000;
const dataRoutes = require('./routes/tabla_prueba-Routes');
const errorHandler = require('./middlewares/errorHandler');

// const corsOptions = {
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
// };

// Middleware para habilitar CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/tablaPrueba', dataRoutes);

// Middleware para manejar errores
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});