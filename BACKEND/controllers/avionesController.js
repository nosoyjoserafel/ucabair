const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, '../data/aviones.json');

const getAviones = (req, res) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: 'Error al leer el archivo de aviones' });
    }
};

const addAvion = (req, res) => {
    try {
        const aviones = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const nuevoAvion = req.body;
        aviones.push(nuevoAvion);
        fs.writeFileSync(filePath, JSON.stringify(aviones, null, 2), 'utf8');
        res.status(201).json(nuevoAvion);
    } catch (error) {
        res.status(500).json({ error: 'Error al escribir en el archivo de aviones' });
    }
};

const updateAvion = (req, res) => {
    try {
        const aviones = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const index = aviones.findIndex(avion => avion.codigo === req.params.codigo);
        if (index !== -1) {
            aviones[index] = req.body;
            fs.writeFileSync(filePath, JSON.stringify(aviones, null, 2), 'utf8');
            res.json(aviones[index]);
        } else {
            res.status(404).json({ error: 'Avión no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el archivo de aviones' });
    }
};

const deleteAvion = (req, res) => {
    try {
        const aviones = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const nuevosAviones = aviones.filter(avion => avion.codigo !== req.params.codigo);
        fs.writeFileSync(filePath, JSON.stringify(nuevosAviones, null, 2), 'utf8');
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el avión' });
    }
};

module.exports = { getAviones, addAvion, updateAvion, deleteAvion };