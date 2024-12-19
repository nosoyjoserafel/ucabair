const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, '../data/materiales.json');

const getMateriales = (req, res) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: 'Error al leer el archivo de materiales' });
    }
};

const addMaterial = (req, res) => {
    try {
        const materiales = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const nuevoMaterial = req.body;
        materiales.push(nuevoMaterial);        
        fs.writeFileSync(filePath, JSON.stringify(materiales, null, 2), 'utf8');
        res.status(201).json(nuevoMaterial);
    } catch (error) {
        res.status(500).json({ error: 'Error al escribir en el archivo de materiales' });
    }
};

const updateMaterial = (req, res) => {
    try {
        const materiales = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const index = materiales.findIndex(material => material.codigo === req.params.codigo);
        if (index !== -1) {
            materiales[index].cantidadDisponible = String(parseInt(materiales[index].cantidadDisponible, 10)+parseInt(req.body.stock, 10));
            fs.writeFileSync(filePath, JSON.stringify(materiales, null, 2), 'utf8');
            res.json(materiales[index]);
        } else {
            res.status(404).json({ error: 'Material no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el archivo de materiales' });
    }
};

const deleteMaterial = (req, res) => {
    try {
        const materiales = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const nuevosMateriales = materiales.filter(material => material.codigo !== req.params.codigo);
        fs.writeFileSync(filePath, JSON.stringify(nuevosMateriales, null, 2), 'utf8');
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el material' });
    }
};

module.exports = { getMateriales, addMaterial, updateMaterial, deleteMaterial };