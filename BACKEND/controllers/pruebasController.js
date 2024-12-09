const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, '../data/pruebas.json');

const getPruebas = (req, res) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: 'Error al leer el archivo de pruebas' });
    }
}

const agregarPrueba = (req, res) => {
    try {
        const pruebas = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const nuevaPrueba = req.body;
        pruebas.push(nuevaPrueba);
        fs.writeFileSync(filePath, JSON.stringify(pruebas, null, 2), 'utf8');
        res.status(201).json(nuevaPrueba);
    } catch (error) {
        res.status(500).json({ error: 'Error al escribir en el archivo de pruebas' });
    }
}

const modificarPrueba = (req, res) => {
    try {
        const pruebas = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const index = pruebas.findIndex(prueba => prueba.codigo === req.params.codigo);
        if (index !== -1) {
            pruebas[index] = req.body;
            fs.writeFileSync(filePath, JSON.stringify(pruebas, null, 2), 'utf8');
            res.json(pruebas[index]);
        } else {
            res.status(404).json({ error: 'Prueba no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el archivo de pruebas' });
    }
}

const eliminarPrueba = (req, res) => {
    try {
        const pruebas = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const nuevasPruebas = pruebas.filter(prueba => prueba.codigo !== req.params.codigo);
        fs.writeFileSync(filePath, JSON.stringify(nuevasPruebas, null, 2), 'utf8');
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la prueba' });
    }
}

module.exports = { getPruebas, agregarPrueba, modificarPrueba, eliminarPrueba };