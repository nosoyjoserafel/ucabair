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
                <button onclick="solicitarStock('${material.codigo}')" class="modal-btn">Solicitar stock</button>
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

function solicitarStock(codigo) {
    const modal = document.querySelector('#form-solicitar-stock').closest('.modal');
    const form = document.querySelector('#form-solicitar-stock');
    
    form.dataset.codigo = codigo;

    // Desplegar modal
    modal.style.display = 'flex';

    // Evento para cuando se solicite la cantidad para el stock
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const cantidad = document.querySelector('#cant-solicitud').value;

        fetch(`/materiales/${codigo}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ stock: cantidad })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al actualizar el material');
            }
            return response.json();
        })
        .then(updatedMaterial => {
            alert(`Stock actualizado para el material con código ${updatedMaterial.codigo}`);
            modal.style.animation = 'fadeOut 0.3s, slideOut 0.3s';
            setTimeout(() => {
                modal.style.display = 'none';
                modal.style.animation = 'fadeIn 0.3s, slideIn 0.3s';
            }, 300);
            fetch('/materiales')
            .then(response => response.json())
            .then(materiales => cargarMateriales(materiales));
        })
        .catch(error => alert('Error al solicitar stock:', error));
    }, { once: true }); // Ensure the event listener is added only once
}

document.getElementById('form-agregar-material').addEventListener('submit', (event) => {
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
    const modals = document.querySelectorAll('.modal');
    const btns = document.querySelectorAll('.modal-btn');
    const closeBtns = document.querySelectorAll('.modal-content .close');

    btns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            modals[index].style.display = 'flex';
        });
    });

    closeBtns.forEach((closeBtn, index) => {
        closeBtn.addEventListener('click', function() {
            modals[index].style.animation = 'fadeOut 0.3s, slideOut 0.3s';
            setTimeout(() => {
                modals[index].style.display = 'none';
                modals[index].style.animation = 'fadeIn 0.3s, slideIn 0.3s';
            }, 300);
        });
    });

    window.addEventListener('click', function(event) {
        modals.forEach((modal, index) => {
            if (event.target === modal) {
                modal.style.animation = 'fadeOut 0.3s, slideOut 0.3s';
                setTimeout(() => {
                    modal.style.display = 'none';
                    modal.style.animation = 'fadeIn 0.3s, slideIn 0.3s';
                }, 300);
            }
        });
    });
});