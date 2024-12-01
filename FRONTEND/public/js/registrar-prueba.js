function generarCodigo() {
    return (Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000).toString();
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('/pruebas')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(pruebas => cargarPruebas(pruebas))
        .catch(error => console.error('Error al cargar las pruebas:', error));
});

function cargarPruebas(pruebas) {
    const tbody = document.querySelector('#tabla-pruebas tbody');
    tbody.innerHTML = '';

    pruebas.forEach(prueba => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${prueba.codigo}</td>
            <td>${prueba.nombre}</td>
            <td>
                <button onclick="modificarPrueba('${prueba.codigo}')">Modificar</button>
                <button onclick="eliminarPrueba('${prueba.codigo}')">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function agregarPrueba(codigo, nombre) {
    const nuevaPrueba = { codigo: codigo, nombre: nombre };
    fetch('/pruebas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaPrueba)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(prueba => {
        alert(`Prueba con código ${prueba.codigo} y nombre ${prueba.nombre} guardada`);
        fetch('/pruebas')
            .then(response => response.json())
            .then(pruebas => cargarPruebas(pruebas));
    })
    .catch(error => console.error('Error al agregar la prueba:', error));
}

function mostrarFormulario(codigo = '', nombre = '') {
    document.getElementById('codigo').value = codigo;
    document.getElementById('nombre').value = nombre;
    document.getElementById('form-container-registrar').style.display = 'block';
}

function buscarPrueba() {
    const codigo = document.getElementById('buscar-codigo').value;
    fetch('/pruebas')
        .then(response => response.json())
        .then(pruebas => {
            if (codigo === '') {
                cargarPruebas(pruebas);
                return;
            }

            const pruebasFiltradas = pruebas.filter(prueba => prueba.codigo.includes(codigo));
            cargarPruebas(pruebasFiltradas);
        })
        .catch(error => console.error('Error al buscar la prueba:', error));
}

function modificarPrueba(codigo) {
    fetch('/pruebas')
        .then(response => response.json())
        .then(pruebas => {
            const prueba = pruebas.find(prueba => prueba.codigo === codigo);

            if (prueba && prueba.codigo === codigo) {
                document.getElementById('modificar-codigo').value = prueba.codigo;
                document.getElementById('modificar-nombre').value = prueba.nombre;
                document.getElementById('form-container-modificar').style.display = 'block';
            } else {
                alert('Prueba no encontrada');
            }
        })
        .catch(error => console.error('Error al modificar la prueba:', error));
}

document.getElementById('modificar-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const codigo = document.getElementById('modificar-codigo').value;
    const nombre = document.getElementById('modificar-nombre').value;

    fetch(`/pruebas/${codigo}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ codigo, nombre })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(prueba => {
        alert(`Prueba con código ${prueba.codigo} modificada a nombre ${prueba.nombre}`);
        document.getElementById('form-container-modificar').style.display = 'none';
        fetch('/pruebas')
            .then(response => response.json())
            .then(pruebas => cargarPruebas(pruebas));
    })
    .catch(error => console.error('Error al modificar la prueba:', error));
});

function eliminarPrueba(codigo) {
    fetch(`/pruebas/${codigo}`, {
        method: 'DELETE'
    })
    .then(() => {
        alert(`Prueba con código ${codigo} eliminada`);
        fetch('/pruebas')
            .then(response => response.json())
            .then(pruebas => cargarPruebas(pruebas));
    })
    .catch(error => console.error('Error al eliminar la prueba:', error));
}

document.getElementById('prueba-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const codigo = generarCodigo();
    const nombre = document.getElementById('nombre').value;

    agregarPrueba(codigo, nombre);
    document.getElementById('form-container-registrar').style.display = 'none';
});