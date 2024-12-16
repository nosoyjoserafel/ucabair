document.addEventListener('DOMContentLoaded', () => {
    fetch('/materiales')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(materiales => cargarMateriales(materiales))
        .catch(error => console.error('Error al cargar los materiales:', error));
});

function cargarMateriales(materiales) {
    const tbody = document.querySelector('#tabla-materiales tbody');
    tbody.innerHTML = '';

    materiales.forEach(material => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${material.codigo}</td>
            <td>${material.nombre}</td>
            <td>${material.ubicacion}</td>
            <td>${material.cantidadDisponible}</td>
            <td>
                <button onclick="solicitarStock('${material.codigo}')">Solicitar stock</button>
                <button onclick="asignarMaterial('${material.codigo}')">Asignar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function agregarMaterial(nombre, ubicacion, stock) {
    let codigo = generarCodigo();
    const nuevoMaterial = { codigo: codigo, nombre: nombre, ubicacion: ubicacion, cantidadDisponible: stock };
    fetch('/materiales', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoMaterial)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(material => {
        alert(`Material con código ${material.codigo} y nombre ${material.nombre} guardada`);
        fetch('/materiales')
            .then(response => response.json())
            .then(materiales => cargarMateriales(materiales));
    })
    .catch(error => alert('Error al agregar la material:', error));
}

document.getElementById('form-agregar-material').addEventListener('submit', (event) => { //no funciona
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const ubicacion = document.getElementById('ubicacion').value;
    const stock = document.getElementById('stock').value;
    agregarMaterial(nombre, ubicacion, stock);
});

function generarCodigo() {
    return (Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000).toString();
}

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    const btn = document.getElementById('btn-agregar-material');
    const closeBtn = document.querySelector('.modal-content .close');

    btn.addEventListener('click', function() {
        modal.style.display = 'flex';
    });

    closeBtn.addEventListener('click', function() {
        modal.style.animation = 'fadeOut 0.3s, slideOut 0.3s';
        setTimeout(() => {
            modal.style.display = 'none';
            modal.style.animation = 'fadeIn 0.3s, slideIn 0.3s';
        }, 300);
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.animation = 'fadeOut 0.3s, slideOut 0.3s';
            setTimeout(() => {
                modal.style.display = 'none';
                modal.style.animation = 'fadeIn 0.3s, slideIn 0.3s';
            }, 300);
        }
    });
});