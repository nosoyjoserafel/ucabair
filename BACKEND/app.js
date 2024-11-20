const express = require('express');
const app = express();
const dataRoutes = require('./routes/dataRoutes');

app.use('/data', dataRoutes);

module.exports = app;