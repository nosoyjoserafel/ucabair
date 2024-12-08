document.addEventListener('DOMContentLoaded', () => {
    fetch('/aviones')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(aviones => cargarAviones(aviones))
        .catch(error => console.error('Error al cargar los aviones:', error));
});

function cargarAviones(aviones) {
    const tbody = document.querySelector('#tabla-aviones tbody');
    tbody.innerHTML = '';

    aviones.forEach(avion => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${avion.codigo}</td>
            <td>${avion.descripcion}</td>
            <td>${avion.fechaFabricacion}</td>
            <td>
                <button onclick="modificarAvion('${avion.codigo}')">Modificar</button>
                <button onclick="eliminarAvion('${avion.codigo}')">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function agregarAvion(codigo, descripcion, fechaFabricacion) {
    const nuevoAvion = { codigo: codigo, descripcion: descripcion, fechaFabricacion: fechaFabricacion };
    fetch('/aviones', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoAvion)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(prueba => {
        alert(`Avion con código ${prueba.codigo} guardado`);
        fetch('/aviones')
            .then(response => response.json())
            .then(aviones => cargarAviones(aviones));
    })
    .catch(error => console.error('Error al agregar el avion:', error));
}

function mostrarFormulario(codigo = '', descripcion = '', fechaFabricacion = '') {
    document.getElementById('codigo').value = codigo;
    document.getElementById('descripcion').value = descripcion;
    document.getElementById('fecha-fabricacion').value = fechaFabricacion;    
    document.getElementById('form-container-registrar').style.display = 'block';
}

function buscarAvion() {
    const codigo = document.getElementById('buscar-codigo').value;
    fetch('/aviones')
        .then(response => response.json())
        .then(aviones => {
            if (codigo === '') {
                cargarAviones(aviones);
                return;
            }
            const avionesFiltrados = aviones.filter(avion => avion.codigo.includes(codigo));
            cargarAviones(avionesFiltrados);
        })
        .catch(error => console.error('Error al buscar el avión:', error));
};

document.getElementById('form-container-registrar').addEventListener('submit', (event) => {
    event.preventDefault();
    const codigo = generarCodigo();
    const descripcion = document.getElementById('descripcion').value;
    const fechaFabricacion = document.getElementById('fecha-fabricacion').value;

    agregarAvion(codigo, descripcion, fechaFabricacion);
    document.getElementById('form-container-registrar').style.display = 'none';
});

function modificarAvion(codigo) {
    fetch(`/aviones`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(aviones => 
            aviones.find(avion => avion.codigo === codigo)
        )
        .then(avion => {
            document.getElementById('modificar-codigo').value = avion.codigo;
            document.getElementById('modificar-descripcion').value = avion.descripcion;
            document.getElementById('modificar-fecha-fabricacion').value = avion.fechaFabricacion;
            document.getElementById('form-container-modificar').style.display = 'block';
        })
        .catch(error => console.error('Error al cargar el avion:', error));
}

document.getElementById('form-container-modificar').addEventListener('submit', (event) => {
    event.preventDefault();
    const codigo = document.getElementById('modificar-codigo').value;
    const descripcion = document.getElementById('modificar-descripcion').value;
    const fechaFabricacion = document.getElementById('modificar-fecha-fabricacion').value;

    fetch(`/aviones/${codigo}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ codigo, descripcion, fechaFabricacion })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(avion => {
        alert(`Avion con código ${avion.codigo} modificado correctamente`);
        document.getElementById('form-container-modificar').style.display = 'none';
        fetch('/aviones')
            .then(response => response.json())
            .then(aviones => cargarAviones(aviones));
    })
    .catch(error => console.error('Error al modificar el avion:', error));
});

function eliminarAvion(codigo) {
    fetch(`/aviones/${codigo}`, {
        method: 'DELETE'
    })
    .then(() => {
        alert(`Avion con código ${codigo} eliminado`);
        fetch('/aviones')
            .then(response => response.json())
            .then(aviones => cargarAviones(aviones));
    })
    .catch(error => console.error('Error al eliminar el avion:', error));
}

function generarCodigo() {
    return (Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000).toString();
}